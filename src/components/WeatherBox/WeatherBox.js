import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';

const WeatherBox = () => {

const handleCityChange = useCallback((city) => {
  
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=f521f15e88e06db9f19c45e1a6fa9441&units=metric`)
  .then(res => res.json())
  .then(data => {

    const weatherData = {
      city: data.name,
      temp: data.main.temp,
      icon: data.weather[0].icon,
      description: data.weather[0].main
    };
    
    console.log(weatherData);
  });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary />
      <Loader />
    </section>
  )
};

export default WeatherBox;




//przyp.: 1. met. fetch łączy z url;
//2. then1 -  konwersja: jako .json;
//3. then2 -  konwesja do JS i wyświetlenie danych w konsoli