import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const FiveCard = ({ weather }) => {
    const date = new Date(weather.dt * 1000); 
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options); 

    return (
        <Box  p={2} borderRadius={'5px'} mb={2}>
            <Text fontWeight={700}>{formattedDate}</Text>
            <Text fontWeight={700}>{Math.round(weather.main.temp)}ºC</Text>
            <Text>{weather.weather[0].description}</Text>
        </Box>
    );
};

export default FiveCard;
