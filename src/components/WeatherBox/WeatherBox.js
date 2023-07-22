import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = () => {

  const [weather, setWeather] = useState('');

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
      
      setWeather(weatherData);
    });
    }, []);

    return (
      <section>
        <PickCity action={handleCityChange} />
        <WeatherSummary {...weather}/>
        <Loader />
      </section>
    )
};

export default WeatherBox;




//przyp.: 1. met. fetch łączy z url;
//2. then1 -  konwersja: jako .json;
//3. then2 -  konwesja do JS i wyświetlenie danych w konsoli

/*dane z f-cji handleCityChange  przekaz. (jako parametry) do komp. <WeatherSummary>:
korzystam z ustawiania st. lok w <WeatherBox> (mogą być wtedy bez problemu przek. do komp.-dziecka za pom. parametrów,
i mogą być w dowolnym miejscu modyf., czyli również w f-cji handleCityChange).
Po odp. z API i przygot. danych w funkcji handleCityChange (weatherData), ustawiamy je jako st. lok. w <WeatherBox>. 
Dalej przek. ten stan jako props do <WeatherSummary>, (tu wyk. w widoku) .
*/