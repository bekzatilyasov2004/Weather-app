import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Divider, Skeleton } from '@chakra-ui/react';
import WeatherCard from '../card/WeatherCard';
import useWeatherStore from '../store/Store';

const Home = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const { weatherData, isLoading, error } = useWeatherStore();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Box w={'100%'} h={'100%'} flexDirection={'column'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box w={'100%'} display={'flex'} justifyContent={{base: 'center', md: 'end'}} alignItems={'center'} p={5}>
                <Text fontSize={'lg'} fontWeight={500} color={'white'}>
                    {currentTime.toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true,
                    })}
                </Text>
            </Box>

            {error && (
                <Box color="red.500" p={4}>
                    <Text>An error occurred: {error}</Text>
                </Box>
            )}

            <Box w={'100%'} display={'flex'} flexDirection={'column'} gap={5} p={10}>
                <Flex w={'100%'} justifyContent={{ base: 'center', md: 'end' }} alignItems={'center'}>
                    <Text textTransform={'capitalize'} fontSize={{ base: '35px', md: '48px' }} fontWeight={700}>
                        {weatherData ? weatherData[0].weather[0].description : <Skeleton h={'40px'} w={'250px'} />}
                    </Text>
                </Flex>
                <Divider />
                <Flex gap={5} justifyContent="center" flexWrap="wrap">
                    {isLoading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} w={'90px'} h={'125px'} borderRadius={'5px'} />
                        ))
                        : weatherData && weatherData.slice(0, 5).map((forecast, index) => (
                            <WeatherCard key={index} weather={forecast} />
                        ))
                    }
                </Flex>
            </Box>
        </Box>
    );
};

export default Home;
