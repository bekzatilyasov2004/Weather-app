import { Box, Divider, Text } from '@chakra-ui/react';
import React from 'react';
import { BsCloudRainHeavy, BsSun, BsCloudSun, BsCloudFog, BsSnow, BsCloudLightning } from "react-icons/bs"; 

const WeatherCard = ({ weather }) => {
    let weatherIcon;
    switch (weather.weather[0].main) {
        case 'Rain':
            weatherIcon = <BsCloudRainHeavy size={'30px'} />;
            break;
        case 'Clear':
            weatherIcon = <BsSun size={'30px'} />;
            break;
        case 'Clouds':
            weatherIcon = <BsCloudSun size={'30px'} />;
            break;
        case 'Fog':
            weatherIcon = <BsCloudFog size={'30px'} />;
            break;
        case 'Snow':
            weatherIcon = <BsSnow size={'30px'} />;
            break;
        case 'Thunderstorm':
            weatherIcon = <BsCloudLightning size={'30px'} />;
            break;
        default:
            weatherIcon = <BsSun size={'30px'} />; 
    }

    const timeOptions = { hour: '2-digit', minute: '2-digit' };

    return (
        <Box   background={'rgba(255,255,255,0.2)'} display={'flex'} gap={2} p={2.5} borderRadius={'5px'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
            <Box>
                <Text>{new Date(weather.dt * 1000).toLocaleTimeString([], timeOptions)}</Text> 
                <Divider />
            </Box>
            <Box p={2.5} borderRadius={'5px'} >
                {weatherIcon}
            </Box>
            <Box>
                <Text fontWeight={700}>{Math.round(weather.main.temp)}ºC</Text>
            </Box>
        </Box>
    );
};

export default WeatherCard;
