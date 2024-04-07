import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import hello  from  '../../../../public/sun.png'

function Weather() {
  const [weather, setWeather] = useState(null);

  function getLatLon() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const preciseLatitude = position.coords.latitude.toFixed(2);
          const preciseLongitude = position.coords.longitude.toFixed(2);
          resolve([preciseLatitude, preciseLongitude]);
        },
        reject
      );
    });
  }

  async function getWeatherData(data) {
    // let apikey2 = "yZoeFYAHLQNTkbtfdtRYLjCCXFdhjPc9";
    const apikey2 = 'XK11NwUmDvkeANMlDi93Q65dkuIHxA00';
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${data[0]},${data[1]}&apikey=${apikey2}`
     

    try {
      const response = await axios.get(url);
      const resData = response.data.timelines.daily[0].values;
console.log(resData)
      const {
        temperatureAvg,
        temperatureMax,
        temperatureMin,
        humidityAvg,
        humidityMax ,
        humidityMin, 
        windSpeedAvg,
        windSpeedMax,
        windSpeedMin,
        dewPointAvg ,
        dewPointMax,
        dewPointMin,
        
      } = resData;

      const WeatherData = {
        temperatureAvg,
        temperatureMax,
        temperatureMin,
        humidityAvg,
        humidityMax ,
        humidityMin, 
        windSpeedAvg,
        windSpeedMax,
        windSpeedMin,
        dewPointAvg ,
        dewPointMax,
        dewPointMin,
        
      };

      return WeatherData;
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const latLonData = await getLatLon();
        const weatherData = await getWeatherData(latLonData);
        setWeather(weatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='w-full h-[100%]  '>

      {weather ? (
         
        <div className='w-full h-full flex items-center  flex-col justify-center
         gap-5 '> <h1 className='text-4xl font-semibold '>Weather Details</h1>
          <div className="main flex  gap-6">
            
            <div className=' rounded-lg flex flex-col items-center p-4 gap-8 bg-slate-200'>
              <img src="../../../../public/sun.jpg" className='rounded-full w-[100px] h-[100px]' alt="" />
              <div className="out"><p>Temperature: <b>{weather.temperatureAvg} ⁰C</b></p>
              <p>Max Temperature: <b>{weather.temperatureMax} ⁰C</b></p>
              <p>Min Temperature: <b>{weather.temperatureMin} ⁰C</b></p></div>
            </div>
            
            <div className=' rounded-lg flex flex-col items-center p-4 gap-8 bg-slate-200'>
              <img src="../../../../public/huumudity.jpg" className='rounded-full w-[100px] h-[100px]' alt="" />
              <div className="out"><p>Humidity: <b>{weather.humidityAvg}</b></p>
              <p>Max Humidity: <b>{weather.humidityMax}</b></p>
              <p>Min Humidity: <b>{weather.humidityMin}</b></p></div>
            </div>
            
            <div className=' rounded-lg flex flex-col items-center p-4 gap-8 bg-slate-200'>
              <img src="../../../../public/windspeeed.jpg" className='rounded-full w-[100px] h-[100px]' alt="" />
              <div className="out"><p>Wind Speed: <b>{weather.windSpeedAvg} m/s</b></p>
              <p>Max Wind Speed: <b>{weather.windSpeedMax} m/s</b></p>
              <p>Min Wind Speed: <b>{weather.windSpeedMin} m/s</b></p></div>
            </div>
            
            <div className=' rounded-lg flex flex-col items-center p-4 gap-8 bg-slate-200'>
              <img src="../../../../public/dewpoint.jpg" className='object-cover rounded-full w-[100px] h-[100px]' alt="" />
              <div className="out"><p>Dew Point: <b>{weather.dewPointAvg} ⁰C</b></p>
              <p>Max Dew Point: <b>{weather.dewPointAvg} ⁰C</b></p>
              <p>Min Dew Point: <b>{weather.dewPointAvg} ⁰C</b></p></div>
            </div>
            
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;