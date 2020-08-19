 import React , {useState,useEffect} from 'react';
import {MenuItem,FormControl,Select} from "@material-ui/core"
import Map from './Map'
import InfoBox from './InfoBox';
import './App.css';
function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState("Worldwide");
  // Code inside here will run once when to component loads and not again.
    // Async Sending a request
   useEffect(() => {
     const getCountriesData  = async() =>{
       fetch("https://disease.sh/v3/covid-19/countries")
       .then((response)=>response.json())
       .then((data)=>{
         const countries = data.map((country)=>({
           name:country.country,
           value:country.countryInfo.iso2,
         }));
        setCountries(countries);
       })
     }
     getCountriesData();
   }, [])
  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    setCountry(countryCode);
  }
  return (
    <div className="App">
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className = "app_dropdown">
          <Select variant = "outlined" onChange = {onCountryChange} value = {country}>
            {/* Loop Through all the countries */}
            <MenuItem value = "Worldwide">WorldWide</MenuItem>;
              {countries.map(country =>(
                  <MenuItem value = {country.value} >{country.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      
      {/* infoBox */}
      <div className="app_stats">
        <InfoBox title = "Coronavirus Cases" total = {5000}></InfoBox>
        <InfoBox title = "Recovered" total = {2000}></InfoBox>
        <InfoBox title = "Deaths" total = {300}></InfoBox>
      </div>
      {/* Map */}
       <Map></Map>   

    </div>
  );
}
export default App;
