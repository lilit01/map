
export const buildMap = (map: any, propertyInfo: any) => {
    map.addSource('contours', {
        'type': 'vector',
        'url': 'mapbox://mapbox.mapbox-terrain-v2'
    });
    map.addSource('wetlands', {
        type: 'vector',
        url: 'mapbox://orithebuilder.dcmhn2y7',
    });
    map.addSource('historic', {
        type: 'vector',
        url: 'mapbox://orithebuilder.3rib6ehg',
    });
    map.addSource('polygon1', {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [propertyInfo?.lot[0]]
            },
        },
    });
    map.addLayer({
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'height']
            ],
            'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
        }
    },);
    map.addLayer({
        'id': 'contours',
        'type': 'line',
        'source': 'contours',
        'source-layer': 'contour',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#ff69b4',
            'line-width': 1
        }
    });
    map.addLayer({
        'id': 'contour-label',
        'type': 'symbol',
        'source': 'contours',
        'source-layer': 'contour',
        'layout': {
            'symbol-placement': 'line',
            'text-field': [
                'concat',
                ['to-string', ['round', ['*', ['get', 'ele'], 3.28084]]], // Convert meters to feet and round
                ' ft'
            ],
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
            'text-size': 10,
            'text-allow-overlap': false,
        },
        'paint': {
            'text-color': '#000',
            'text-halo-color': '#fff',
            'text-halo-width': 1,
        }
    });

    map.addLayer({
        id: 'wetlands',
        type: 'fill',
        source: 'wetlands',
        'source-layer': 'wetlands',
        paint: {
            'fill-color': '#00BFFF',
            'fill-opacity': 0.2,
        },
    });

    map.addLayer({
        id: 'historic',
        type: 'fill',
        source: 'historic',
        'source-layer': 'historic',
        paint: {
            'fill-color': '#ff0000', // Red color
            'fill-opacity': 0.2, // Adjust opacity as needed
        },
    });

    // // Add custom tileset layer line
    map.addLayer({
        'id': 'parcels',
        'type': 'line',
        'source': {
            'type': 'vector',
            'url': 'mapbox://orithebuilder.bvnraca5'
        },
        'minzoom': 15,
        'source-layer': 'parcels',
        'paint': {
            'line-color': '#000000',
            'line-opacity': 0.3,
            'line-width': 2
        }
    });
    map.addLayer({
        id: 'polygon-outline1',
        type: 'line',
        source: 'polygon1',
        layout: {},
        paint: {
            'line-color': 'rgba(0, 41, 255, 1)',
            'line-width': 2,
        },
    });

}