import { create } from 'zustand';
import axios from 'axios';

const useWeatherStore = create((set) => ({
  weatherData: null,
  isLoading: false,
  error: null,
  locationName: '', 
  fetchWeather: async (city) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a32ab606b7fded2230eefed0b13f4b4f&units=metric`
      );
      set({ weatherData: response.data.list, isLoading: false, locationName: response.data.city.name }); 
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  fetchWeatherByCoordinates: async (lat, lon) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a32ab606b7fded2230eefed0b13f4b4f&units=metric`
      );
      set({ weatherData: response.data.list, isLoading: false, locationName: response.data.city.name }); 
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  }
}));

export default useWeatherStore;
