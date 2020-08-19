 import React , {useState,useEffect} from 'react';
import {MenuItem,FormControl,Select,Card, CardContent} from "@material-ui/core"
import Map from './Map'
import InfoBox from './InfoBox';
import Table from './Table';
import './App.css';
function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState("Worldwide");
  const [countryInfo,setCountryInfo] = useState([]);
  const [tableData,setTableData] = useState([]);
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
        setTableData(data);
       })
     }
     getCountriesData();
   }, [])
   useEffect(() => {
      fetch('https://disease.sh/v3/covid-19/all').then(response=>response.json()).then(data=>(
        setCountryInfo(data)
      ))
  }, [])
  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url = countryCode === 'Worldwide'?'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`
    await fetch(url).then(response => response.json()).then(data=>{
        setCountryInfo(data)
    })
  }
  console.log(countryInfo)
  return (
    <div className="App">
      <div className="app_left">
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
          <InfoBox title = "Coronavirus Cases" cases = {countryInfo.todayCases} total = {countryInfo.cases}></InfoBox>
          <InfoBox title = "Recovered" cases = {countryInfo.todayRecovered} total = {countryInfo.recovered}></InfoBox>
          <InfoBox title = "Deaths" cases = {countryInfo.todayDeaths} total = {countryInfo.deaths}></InfoBox>
        </div>
        <Map></Map>  
      </div>
  
      
      <Card className="app_right">
          <CardContent>
            <h3>Live Cases By Country</h3>
            {/* Table */}
            <Table countries = {tableData} ></Table>
            <h3>Worldwide New Cases</h3>
          </CardContent>
      </Card>
       

    </div>
  );
}
export default App;
