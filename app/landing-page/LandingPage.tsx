'use client'
import * as React from 'react';
import { useSearchParams } from 'next/navigation'
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import getLPTheme from './getLPTheme';
import Map from './components/Map';
import Summary from './components/Summary';
import CottageTitleDesc from './components/CottageTitleDesc';
import Carousel from './components/Carousel';
import { fetchStreetData } from '@/utils/api';
import PanelTabs from './components/PanelTabs';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import FloorPlanModal from './modals/FloorPlanModal';


export interface AddressParams {
    addr_num: string;
    addr_street: string;
    addr_city: string;
    addr_zip: string;
    lat: number;
    lng: number;
}

export interface PropertyInfo {
    property_id: number;
    city_id: number;
    sbl: string;
    use_code: string;
    zoning: string;
    lot_size: number;
    gross_building_area: number;
    year_built: number;
    style: string;
    owner: string;
    addr_num: string;
    addr_street: string;
    addr_apt: string;
    zip: string;
    addr_city: string;
}

export interface ChildComponentProps {
    propertyInfo: PropertyInfo;
}

export default function LandingPage() {

    const [mode, setMode] = React.useState<PaletteMode>('light');
    const LPtheme = createTheme(getLPTheme(mode));
    const [data, setData] = React.useState<PropertyInfo | null>(null);
    const [cordinates, setCordinates] = React.useState<[] | null>(null);
    const [error, setError] = React.useState<any>(null);
    const [tabValue, setTabValue] = React.useState(0);
    const searchParams = useSearchParams();
    const [selectedFloorPlan, setSelectedFloorPlan] = React.useState(null);
    const [isSmallScreen, setIsSmallScreen] = React.useState(false);

    React.useEffect(() => {
        const checkScreenSize = () => {
            const isSmall = window.matchMedia("(max-width: 480px)").matches;
            setIsSmallScreen(isSmall);
        };
        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    const addressParams: AddressParams = React.useMemo(() => {
        const paramsObj: any = {};
        searchParams.forEach((value, key) => {
            paramsObj[key] = value;
        });
        return {
            addr_num: paramsObj['addr_num'] || '',
            addr_street: paramsObj['addr_street'] || '',
            addr_city: paramsObj['addr_city'] || '',
            addr_zip: paramsObj['addr_zip'] || '',
            lat: Number(paramsObj['lat']) || 0,
            lng: Number(paramsObj['lng']) || 0,
        };
    }, [searchParams]);

    React.useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchStreetData(addressParams);
                setData(result.attributes);
                setCordinates(result);
            } catch (error) {
                setError(error);
            }
        };

        if (addressParams.addr_num) {
            getData();
        }
    }, [addressParams]);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };


    return (
        <ThemeProvider theme={LPtheme}>
            <CssBaseline />
            <Hero addressParams={addressParams} />
            <Box sx={{ bgcolor: 'background.default' }}>
                {!isSmallScreen ? (<>
                    <Pricing addressParams={addressParams} isSmallScreen={isSmallScreen} />
                    <Summary propertyInfo={data} isSmallScreen={isSmallScreen} />
                    <CottageTitleDesc
                        title='Backyard Cottage'
                        desc1="Many towns and cities will allow you to build a Detached ADU (Accessory Dwelling Unit), also referred to as a"
                        desc2="backyard cottage. Use the options below to explore where one might fit on your property."
                    />
                    <Map addressParams={addressParams} propertyInfo={cordinates} setSelectedFloorPlan={setSelectedFloorPlan} selectedFloorPlan={selectedFloorPlan} isSmallScreen={isSmallScreen} />
                    <Divider />
                    <CottageTitleDesc
                        title='In Home Apartment'
                        desc1="Many towns and cities will allow you to build an Internal ADU (Accessory Dwelling Unit), also referred to as an In Home Apartment. These are"
                        desc2="often built by finishing or converting space in your basement, attic, or other interior space. View photos below for inspiration."
                    />
                    <Carousel isSmallScreen={isSmallScreen} />
                    <Footer />
                </>) : (<>
                    {(tabValue === 0 && isSmallScreen) && <Pricing addressParams={addressParams} isSmallScreen={isSmallScreen} />}

                    {(tabValue === 1 && isSmallScreen) && <Map addressParams={addressParams} propertyInfo={cordinates} setSelectedFloorPlan={setSelectedFloorPlan} selectedFloorPlan={selectedFloorPlan} isSmallScreen={isSmallScreen} />}
                    {(tabValue === 2 && isSmallScreen) && <Carousel />}

                    <Box className='tabComponent'>

                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs example" sx={{
                            '& .MuiTab-root': {
                                fontWeight: 400,
                                textTransform: 'none',
                                fontSize: 14,
                                color: "#5E5E5E",
                                lineHeight: '21px',
                            },
                            '& .Mui-selected': {
                                color: '#7B61FF !important',
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#7B61FF',
                            },
                        }}>
                            <Tab label="Summary" />
                            <Tab label="Backyard Cottage" />
                            <Tab label="In Home Apt" />
                        </Tabs>
                    </Box>

                    {(tabValue === 0 && isSmallScreen) && <Summary propertyInfo={data} isSmallScreen={isSmallScreen} />}
                    {(tabValue === 1 && isSmallScreen) &&
                        <div >
                            <FloorPlanModal setSelectedFloorPlan={setSelectedFloorPlan} selectedFloorPlan={selectedFloorPlan} isSmallScreen={isSmallScreen} />
                        </div>}

                </>)}
                {(tabValue === 2 && isSmallScreen) &&
                    <CottageTitleDesc
                        isSmallScreen={isSmallScreen}
                        title='In Home Apartment'
                        desc1="Many towns and cities will allow you to build an Internal ADU (Accessory Dwelling Unit), also referred to as an In Home Apartment. These are"
                        desc2="often built by finishing or converting space in your basement, attic, or other interior space. View photos below for inspiration."
                    />}




            </Box>
        </ThemeProvider>
    );
}