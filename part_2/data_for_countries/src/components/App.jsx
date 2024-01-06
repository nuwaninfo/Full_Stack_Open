import { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./CountryDetails";
import Notification from "./Notification";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [searchCountryDisplay, setSearchCountryDisplay] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [iSshowCountryDetails, setIsShowCountryDetails] = useState(false);
  const [showCountryDetails, setShowCountryDetails] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((country) => {
        setCountries(country.data);
        setAllCountries(country.data);
        setSearchCountryDisplay([]);
      });
  }, []);

  const handleSearch = (event) => {
    const serchedCountry = event.target.value;
    setSearchCountry(event.target.value);

    const serchedCountires = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(serchedCountry.toLowerCase());
    });

    setShowCountryDetails(serchedCountires);

    if (serchedCountires.length > 10) {
      setErrorMessage("Too many matches, specify another filter");
      setSearchCountryDisplay([]);
      setIsShowCountryDetails(false);
    } else if (serchedCountires.length === 1) {
      setSearchCountryDisplay([]);
      setCountries(serchedCountires);
      setErrorMessage(null);
      setIsShowCountryDetails(true);
      setCountries(allCountries);
      showWeatherData(serchedCountires);
    } else if (serchedCountires.length !== 1 && serchedCountires.length <= 10) {
      setSearchCountryDisplay(serchedCountires);
      setErrorMessage(null);
      setIsShowCountryDetails(false);
    }

    if (serchedCountry === "") {
      setErrorMessage(null);
    }
  };

  const handleShow = (cca2) => {
    const searchKey = cca2;
    const selectedCountry = allCountries.filter((country) => {
      return country.cca2 === searchKey;
    });

    setSearchCountryDisplay([]);
    setShowCountryDetails(selectedCountry);
    setErrorMessage(null);
    setIsShowCountryDetails(true);
    showWeatherData(selectedCountry);
  };

  const showWeatherData = (countryDetails) => {
    const { latlng } = countryDetails[0];
    const [latitude, longitude] = latlng;
    const units = "metric";
    const API_KEY = import.meta.env.VITE_SOME_KEY;
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${API_KEY}`;
    const weatherIconCode = "nuwan";
    axios.get(URL).then((response) => {
      setWeatherData(response.data);
    });
  };

  return (
    <div>
      find countries
      <input value={searchCountry} onChange={handleSearch} />
      <Notification message={errorMessage} />
      {searchCountryDisplay.map((country) => {
        return (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button tld={country.tld} onClick={() => handleShow(country.cca2)}>
              show
            </button>
          </div>
        );
      })}
      {iSshowCountryDetails === true ? (
        <CountryDetails
          countryDetails={showCountryDetails}
          weatherData={weatherData}
        />
      ) : null}
      {}
    </div>
  );
};

export default App;
