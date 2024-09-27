import { Box } from '@chakra-ui/react';
import { FloatButton } from 'antd';
import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import Home from '../components/Home';
import Sidebar from '../components/Sidebar';
import useWeatherStore from '../store/Store';

const HomePage = () => {
  const { weatherData, fetchWeatherByCoordinates } = useWeatherStore(); 

  const getBackgroundImage = () => {
    if (!weatherData || !weatherData[0]) return '/bg.jpg'; 

    const condition = weatherData[0].weather[0].main; 

    switch (condition) {
      case 'Clear':
        return '/sunny-bg.jpg';
      case 'Clouds':
        return '/cloudy-bg.jpg';
      case 'Rain':
        return '/rainy-bg.jpg';
      case 'Thunderstorm':
        return '/thunderstorm-bg.jpg';
      case 'Snow':
        return '/snowy-bg.jpg';
      default:
        return '/bg.jpg'; 
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude); // Fetch weather data for user's coordinates
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Box
      color={'white'}
      background={`url(${getBackgroundImage()})`}
      bgPos={'center'}
      bgSize={'cover'}
      w={'100%'}
      display={'flex'}
      justifyContent={'space-around'}
      alignItems={'center'}
      flexDirection={{ base: 'column-reverse', md: 'row' }}
    >
      <Box h={{ base: '', md: '100vh' }} w={'100%'}>
        <Home />
      </Box>
      <Box h={{ base: '', md: '100vh' }} bg={'transparent'} backdropFilter={'blur(5px)'} w={{ base: '100%', md: '450px' }}>
        <Sidebar />
      </Box>
      <FloatButton 
        type='primary' 
        icon={<IoLocationOutline />} 
        onClick={handleLocationClick} 
      />
    </Box>
  );
};

export default HomePage;
