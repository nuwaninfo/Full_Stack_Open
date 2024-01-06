import Weather from "./Weather";

const CountryDetails = ({ countryDetails, weatherData }) => {
  const { name, capital, area, languages, flags } = countryDetails[0];

  return (
    <div>
      <h1>{name.common}</h1>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(languages).map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
      <div>
        <img src={flags.png} />
      </div>
      <Weather capital={capital} weatherData={weatherData} />
    </div>
  );
};

export default CountryDetails;
