import { Box, Divider, Text, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsCloudRainHeavy, BsSun, BsCloudSun, BsCloudFog, BsSnow, BsCloudLightning } from "react-icons/bs"; 
import { BiWind } from "react-icons/bi"; // Wind icon
import { WiHumidity, WiBarometer } from "react-icons/wi"; // Humidity and Pressure icons

const SidebarCart = ({ weather,locationName }) => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateCurrentTime = () => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };

        updateCurrentTime();

        const interval = setInterval(updateCurrentTime, 1000);

        return () => clearInterval(interval);
    }, []);

    let weatherIcon;
    switch (weather.weather[0].main) {
        case 'Rain':
            weatherIcon = <BsCloudRainHeavy size={'40px'} />;
            break;
        case 'Clear':
            weatherIcon = <BsSun size={'40px'} />;
            break;
        case 'Clouds':
            weatherIcon = <BsCloudSun size={'40px'} />;
            break;
        case 'Fog':
            weatherIcon = <BsCloudFog size={'40px'} />;
            break;
        case 'Snow':
            weatherIcon = <BsSnow size={'40px'} />;
            break;
        case 'Thunderstorm':
            weatherIcon = <BsCloudLightning size={'40px'} />;
            break;
        default:
            weatherIcon = <BsSun size={'40px'} />; 
    }

    return (
        <Box 
            display={'flex'} 
            gap={2} 
            p={2.5} 
            borderRadius={'5px'} 
            justifyContent={'center'} 
            alignItems={'center'} 
            flexDirection={'column'}
        >
            <Box mb={-5}>
                <Text textAlign={'center'} fontSize={'20px'} fontWeight={700}>{locationName}</Text>
                <Text fontSize={{ base: '40px', md: '60px' }} fontWeight={700}>
                    {Math.round(weather.main.temp)}ºC
                </Text>
            </Box>
            <Box >
                {weatherIcon}
            </Box>
            <Flex justifyContent={'center'} alignItems={'center'} gap={2}>
                <Flex alignItems={'center'}>
                    <BiWind />
                    <Text ml={1}>{weather.wind.speed} m/s</Text>
                </Flex>
                <Flex alignItems={'center'}>
                    <WiHumidity />
                    <Text ml={1}>{weather.main.humidity}%</Text>
                </Flex>
                <Flex alignItems={'center'}>
                    <WiBarometer />
                    <Text ml={1}>{weather.main.pressure} hPa</Text>
                </Flex>
            </Flex>
        </Box>
    );
};

export default SidebarCart;
