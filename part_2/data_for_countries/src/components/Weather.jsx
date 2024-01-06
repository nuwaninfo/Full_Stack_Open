const Weather = ({ weatherData, capital }) => {
  const temperature =
    Object.keys(weatherData).length > 0 ? weatherData.main.temp : null;
  const wind =
    Object.keys(weatherData).length > 0 ? weatherData.wind.speed : null;
  const weatherIconCode =
    Object.keys(weatherData).length > 0 ? weatherData.weather[0].icon : null;
  console.log("weather icon", weatherIconCode);

  const weartherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>temperature {temperature} Celcius</div>
      <div>
        <img src={weartherIconUrl} />
      </div>
      <div>wind {wind} m/s</div>
    </div>
  );
};

export default Weather;
