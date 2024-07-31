// @ts-nocheck 
import React from 'react';
import mapboxgl from 'mapbox-gl';
import FloorPlanModal from '../modals/FloorPlanModal';
import SelectedPlanModal from '../modals/SelectedPlanModal';
import LayerModal from '../modals/LayerModal';
import * as turf from '@turf/turf';
import { AddressParams } from '../LandingPage';
import { buildMap } from './MapBuilder';

mapboxgl.accessToken = 'pk.eyJ1Ijoib3JpdGhlYnVpbGRlciIsImEiOiJjbHlmZ2R5dncwZHF3MmtzZXNueWFscmd4In0.P98s8fBkvIi6TVL6QgKqLA';


export interface ChildComponentProps {
    addressParams: AddressParams;
    propertyInfo: [] | null;
    setSelectedFloorPlan: any;
    selectedFloorPlan: any;
    isSmallScreen: boolean

}

const layerButtons = [
    { id: 1, image: '/assets/images/wetlands.jpg', label: "Wetlands", mapLayers: ['wetlands'] },
    { id: 2, image: '/assets/images/historical.png', label: "Historical", mapLayers: ['historic'] },
    { id: 3, image: '/assets/images/topography.png', label: "Topography", mapLayers: ['contours', 'contour-label'] },
    // { id: 4, image: '/assets/images/Aerial.png', label: "Aerial", mapLayers: [] }
]

const Map: React.FC<ChildComponentProps> = ({ addressParams, propertyInfo, selectedFloorPlan, setSelectedFloorPlan, isSmallScreen }) => {

    const mapContainerRef = React.useRef(null);
    const [map, setMap] = React.useState(null);
    const [polygonCoordinates, setPolygonCoordinates] = React.useState(null)
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState(null);
    const [iconRotation, setIconRotation] = React.useState(0);
    const [layersOpen, setLayersOpen] = React.useState<any>(false)
    const [selectedButtons, setSelectedButtons] = React.useState([]);
    const mapRef = React.useRef(null);

    const getNewCoordinates = (startLat: any, startLng: any, widthInches: any, heightInches: any): any => {
        // Convert inches to degrees
        const latitudeOffset = inchesToDegrees(heightInches, startLat);
        const longitudeOffset = inchesToDegrees(widthInches, startLat);

        return [
            [startLng, startLat],
            [startLng + longitudeOffset, startLat],
            [startLng + longitudeOffset, startLat + latitudeOffset],
            [startLng, startLat + latitudeOffset]
        ]
    }

    const inchesToDegrees = (inches: any, latitude: any): any => {
        const inchesPerMile = 63360;
        const miles = inches / inchesPerMile;
        const degreesPerMileLatitude = 1 / 69; // Degrees of latitude per mile
        const degreesPerMileLongitude = 1 / (69 * Math.cos(latitude * (Math.PI / 180))); // Degrees of longitude per mile
        return miles * (latitude < 90 ? degreesPerMileLatitude : degreesPerMileLongitude);
    }


    function calculate(sLat, sLng, cal, curent, curentCord) {
        const coords = getNewCoordinates(sLat, sLng, cal[curent - 1], cal[curent]);

        if (cal.length > curent + 1) {
            calculate(coords[coords.length - 1][curent], coords[coords.length - 1][curent - 1], cal, 3, [...curentCord, ...coords])
        } else {
            setPolygonCoordinates([...curentCord, ...coords])
        }
    };
    const getCentroid = (coordinates) => {
        if (coordinates) {

            let x = 0;
            let y = 0;
            let area = 0;
            const numPoints = coordinates.length;

            for (let i = 0; i < numPoints; i++) {
                const x0 = coordinates[i][0];
                const y0 = coordinates[i][1];
                const x1 = coordinates[(i + 1) % numPoints][0];
                const y1 = coordinates[(i + 1) % numPoints][1];
                const a = x0 * y1 - x1 * y0;
                area += a;
                x += (x0 + x1) * a;
                y += (y0 + y1) * a;
            }

            area *= 0.5;
            x /= (6.0 * area);
            y /= (6.0 * area);

            return [x, y];
        }
    };

    React.useEffect(() => {
        const map = mapRef.current;
        if (!map) return;
        if (map) {
            // Remove existing layers and sources if they exist
            if (map.getSource('polygon')) {
                map.removeLayer('polygon-outline');
                map.removeLayer('polygon');
                map.removeSource('polygon');
            }

            // Add polygon layer and source
            const closedCoordinates = ensureClosedRing(polygonCoordinates);
            map.addSource('polygon', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [closedCoordinates],
                    },
                },
            });

            map.addLayer({
                id: 'polygon',
                type: 'fill',
                source: 'polygon',
                layout: {},
                paint: {
                    'fill-color': 'rgba(0, 41, 255, 0.63)',
                    'fill-opacity': 0.8,
                },
            });

            map.addLayer({
                id: 'polygon-outline',
                type: 'line',
                source: 'polygon',
                layout: {},
                paint: {
                    'line-color': '#000',
                    'line-width': 2,
                },
            });

            // Add rotate icon only when the polygon is added
            if (!map.getSource('icon')) {
                map.addSource('icon', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [0, 0], // Placeholder, will update position
                                },
                            },
                        ],
                    },
                });

                map.addLayer({
                    id: 'rotate-icon',
                    type: 'symbol',
                    source: 'icon',
                    layout: {
                        'icon-image': 'rotate-right-icon', // Define your icon here
                        'icon-size': 1,
                    },
                });
            }

            // Calculate bounds and position the rotate icon near the polygon's corner
            const bounds = turf.bbox(turf.polygon([closedCoordinates]));
            const [minLng, minLat, maxLng, maxLat] = bounds;

            // Define the corner you want to position the icon near (e.g., top-right corner)
            const cornerLng = maxLng;
            const cornerLat = maxLat;

            // Offset from the corner
            const offsetLng = (maxLng - minLng) * -0.2; // Adjust offset as needed
            const offsetLat = (maxLat - minLat) * -0.2; // Adjust offset as needed

            const rotateIconLng = cornerLng - offsetLng;
            const rotateIconLat = cornerLat - offsetLat;

            map.getSource('icon').setData({
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [rotateIconLng, rotateIconLat],
                        },
                    },
                ],
            });

            map.on('mouseenter', 'rotate-icon', () => {
                map.getCanvas().style.cursor = 'pointer'; // Set cursor to pointer
            });

            map.on('mouseleave', 'rotate-icon', () => {
                map.getCanvas().style.cursor = ''; // Reset cursor
            });
            map.on('click', 'rotate-icon', (e) => {
                rotatePolygon();
            });

            if (map.getLayer('rotate-icon')) {
                map.moveLayer('rotate-icon');
            }
        }
    }, [polygonCoordinates]);

    React.useEffect(() => {
        const map = mapRef.current;
        if (!map) return;
        if (map) {
            const lotPolygon = turf.polygon([ensureClosedRing(propertyInfo?.lot[0])]);
            let animationFrameId;

            const onMouseDown = (e) => {
                if (map.queryRenderedFeatures(e.point, { layers: ['polygon'] }).length) {
                    setIsDragging(true);
                    setDragStart(e.lngLat);
                    map.getCanvas().style.cursor = 'grab';
                    map.dragPan.disable();
                }
            };

            const onMouseMove = (e) => {
                if (!isDragging) return;
                cancelAnimationFrame(animationFrameId);
                animationFrameId = requestAnimationFrame(() => {
                    const lngDiff = e.lngLat.lng - dragStart.lng;
                    const latDiff = e.lngLat.lat - dragStart.lat;

                    // Ensure the new coordinates form a closed ring
                    const newCoordinates = ensureClosedRing(polygonCoordinates.map(coord => [coord[0] + lngDiff, coord[1] + latDiff]));

                    // Define new polygon using turf
                    const newPolygon = turf.polygon([newCoordinates]);

                    // Check if the new polygon is within the lot
                    const isWithinLot = turf.booleanContains(lotPolygon, newPolygon);

                    if (isWithinLot) {
                        setPolygonCoordinates(newCoordinates);
                        setDragStart(e.lngLat);
                    }
                });
            };

            const onMouseUp = () => {
                if (!isDragging) return;

                setIsDragging(false);
                map.getCanvas().style.cursor = '';
                map.dragPan.enable();
                cancelAnimationFrame(animationFrameId);
            };

            map.on('mousedown', onMouseDown);
            map.on('mousemove', onMouseMove);
            map.on('mouseup', onMouseUp);

            return () => {
                map.off('mousedown', onMouseDown);
                map.off('mousemove', onMouseMove);
                map.off('mouseup', onMouseUp);
                cancelAnimationFrame(animationFrameId);
            };
        }
    }, [polygonCoordinates, isDragging, dragStart]);

    const ensureClosedRing = (coordinates) => {
        if (coordinates.length > 0) {
            const first = coordinates[0];
            const last = coordinates[coordinates.length - 1];
            if (first[0] !== last[0] || first[1] !== last[1]) {
                coordinates.push(first);
            }
        }
        return coordinates;
    };


    // Initialize map when component mounts
    React.useEffect(() => {
        if (propertyInfo && !mapRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/light-v10',
                center: [addressParams.lng, addressParams.lat],
                zoom: 19,
                pitch: 45,
            });

            map.on('style.load', () => {
                buildMap(map, propertyInfo);
                displayLayers(map, selectedButtons);
                map.loadImage('/assets/images/icons/Rotate.png', (error, image) => {
                    if (error) {
                        return;
                    }
                    if (!map.hasImage('rotate-right-icon')) {
                        map.addImage('rotate-right-icon', image);
                    }
                });
            });

            mapRef.current = map;
        }

        // Cleanup function to remove the map instance when the component unmounts
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [propertyInfo, selectedButtons, addressParams]);

    const displayLayers = (map, selectedButtons) => {
        layerButtons.forEach(layer => {
            layer.mapLayers.forEach(name => {
                if (selectedButtons && selectedButtons.includes(layer.id)) {
                    map.setLayoutProperty(name, 'visibility', 'visible');
                } else {
                    map.setLayoutProperty(name, 'visibility', 'none');
                }
            })
        })
    }

    React.useEffect(() => {
        if (map && map.isStyleLoaded()) {
            displayLayers(map, selectedButtons)
        }
    }, [map, selectedButtons])


    const handleSelectImage = (selectedImage) => {
        const centroid = getCentroid(propertyInfo?.lot[0]);

        let cordinats
        if (selectedImage.dimensions.includes(',')) {
            cordinats = selectedImage.dimensions.split(',').join("x").split("x")
        }
        else {
            cordinats = selectedImage.dimensions.split('x')
        }

        calculate(centroid[1], centroid[0], cordinats, 1, [])
    };

    const rotatePolygon = () => {
        const angle = -15; // Rotation angle in degrees
        setIconRotation(iconRotation + angle);

        // Rotate polygon coordinates
        const radians = (angle * Math.PI) / 180;
        const center = turf.center(turf.polygon([polygonCoordinates])).geometry.coordinates;
        const rotatedCoordinates = polygonCoordinates.map(([lng, lat]) => {
            const x = lng - center[0];
            const y = lat - center[1];

            const newLng = center[0] + (x * Math.cos(radians) - y * Math.sin(radians));
            const newLat = center[1] + (x * Math.sin(radians) + y * Math.cos(radians));

            return [newLng, newLat];
        });

        const closedCoordinates = ensureClosedRing(rotatedCoordinates);
        setPolygonCoordinates(closedCoordinates);
    };

    return (
        <div style={{ display: "flex", height: isSmallScreen ? '552px' : "702px", marginTop: isSmallScreen ? "" : "60px", position: "relative" }}>
            <div style={{ position: "absolute", right: "30px", top: isSmallScreen ? "90px" : "30px", cursor: 'pointer' }} onClick={() => setLayersOpen(!layersOpen)}>
                <img src="/assets/images/icons/layers.png" alt="Custom Icon" style={{ width: '40px', height: '40px' }} />
            </div>
            {layersOpen &&
                <div style={{ position: "absolute", right: "30px", top: isSmallScreen ? "150px" : "99px" }}>
                    <LayerModal buttons={layerButtons} selectedButtons={selectedButtons} setSelectedButtons={setSelectedButtons} />
                </div>}
            {!isSmallScreen &&
                <div style={{ padding: "31px 0 ", height: "100%", width: "343px", position: 'absolute', backgroundImage: "url(/assets/images/floorBackground.png)" }}>
                    <div style={{ position: "relative" }}>
                        <FloorPlanModal setSelectedFloorPlan={setSelectedFloorPlan} selectedFloorPlan={selectedFloorPlan} />
                    </div>
                </div>}


            <div style={{ width: "100%" }} ref={mapContainerRef} className='map-container' />
            <div >

                {selectedFloorPlan &&
                    <SelectedPlanModal setSelectedFloorPlan={setSelectedFloorPlan} selectedFloorPlan={selectedFloorPlan} onSelect={handleSelectImage} isSmallScreen={isSmallScreen} />
                }
            </div>
        </div>
    );
};





export default Map;