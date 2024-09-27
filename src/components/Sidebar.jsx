import React, { useEffect } from 'react';
import { useCountries } from 'use-react-countries';
import { Box, Select,Divider, Text, Spinner, Alert, Skeleton } from '@chakra-ui/react';
import useWeatherStore from '../store/Store';
import SidebarCard from '../card/SidebarCard'; 
import FiveCard from '../card/FiveCard';

const Sidebar = () => {
    const { countries, loading, error } = useCountries();
    const { fetchWeather, fetchWeatherByCoordinates, locationName, weatherData, isLoading } = useWeatherStore();

    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherByCoordinates(latitude, longitude);
                    },
                    (error) => {
                        console.error("Error getting location: ", error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };

        getUserLocation();
    }, [fetchWeatherByCoordinates]); 

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        if (selectedCountry) {
            fetchWeather(selectedCountry);
        }
    };

    const getUniqueForecasts = (data) => {
        const uniqueForecasts = [];
        const seenDates = new Set();

        data.forEach((forecast) => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString();
            if (!seenDates.has(date)) {
                seenDates.add(date);
                uniqueForecasts.push(forecast);
            }
        });

        return uniqueForecasts.slice(0, 5); 
    };

    return (
        <Box w={'100%'} p={5}>
            {loading && <Spinner size="lg" />}
            {error && (
                <Alert status="error">
                    <Text color="red.500">Error loading countries: {error.message}</Text>
                </Alert>
            )}

            <Select placeholder="Select a country" onChange={handleCountryChange}>
                {countries && countries.map((country) => (
                    <option key={country.code} value={country.name}>
                        {country.name}
                    </option>
                ))}
            </Select>
            <Box w={'100%'} mt={5}>
                {isLoading ? (
                    Array.from({ length: 1 }).map((_, index) => (
                        <Skeleton key={index} w={'100%'} h={'155px'} borderRadius={'5px'} />
                    ))
                ) : weatherData && weatherData.length > 0 ? (
                    <SidebarCard key={0} locationName={locationName} weather={weatherData[0]} /> 
                ) : (
                    !isLoading && <Text>No weather data available.</Text>
                )}
            </Box>
                    <Divider />
            <Box mt={5}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>The Next Days Forecast</Text>
                <Box>
                    
                    {weatherData && weatherData.length > 1 ? (
                        getUniqueForecasts(weatherData).map((forecast, index) => (
                            <>
                            <FiveCard key={index} weather={forecast} />
                            <Divider />
                            </>
                        ))
                    ) : (
                        <Text>No forecast data available.</Text>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
