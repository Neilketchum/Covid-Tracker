 import React , {useState,useEffect} from 'react';
 import {MenuItem,FormControl,Select,Card, CardContent} from "@material-ui/core"
 import Map from './Map'
 import InfoBox from './InfoBox';
 import Table from './Table';
 import './App.css';
 import { sortData,prettyPrintStat } from './util';
 import { Line } from 'react-chartjs-2';
 import LineGraph from './LineGraph';
 import './infoBox.css'
 import numeral from "numeral";
 import "leaflet/dist/leaflet.css"
 
 function App() {
   const [countries,setCountries] = useState([]);
   const [country,setCountry] = useState("Worldwide");
   const [countryInfo,setCountryInfo] = useState([]);
   const [tableData,setTableData] = useState([]);
   const [mapCenter,setMapCenter] = useState({lat:23.0225,lng:72.5714});
   const [mapZoom,setMapZoom] = useState(2.5);
   const [mapCountries,setMapCountries]  = useState([]);
   const [casesType, setCasesType] = useState("cases");
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
          const sortedData = sortData(data);
         setCountries(countries);
         setTableData(sortedData);
         setMapCountries(data);
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
     console.log(countryCode);
     if(countryCode === 'PK'){
       alert("Terrorist are not alowd here")
     }else{
       setCountry(countryCode);
       const url = countryCode === 'Worldwide'?'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`
       await fetch(url).then(response => response.json()).then(data=>{
           setCountryInfo(data)
           setMapCenter([data.countryInfo.lat,data.countryInfo.long])
           setMapZoom(5);
       })
     }
     
   }
 
   return (
     <div>
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
         <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
          </div>
         <Map mapZoom = {mapZoom} mapCenter = {mapCenter} countries = {mapCountries} casesType={casesType}></Map>  
       </div>     
       <Card className="app_right">
           <CardContent>
             <h3>Live Cases By Country</h3>
             {/* Table */}
             <Table countries = {tableData} ></Table>
                <h3>Worldwide New {casesType.toUpperCase()}</h3>
             <LineGraph className = "app_graph" casesType = {casesType}></LineGraph>
           </CardContent>
       </Card>
 
     </div>
     <div className = 'footer'>
              <div>
                  <a href = 'https://www.instagram.com/neilketchum?r=nametag'><i class="fab fa-instagram fa-5x"></i></a>
                   
              </div> 
              <div>
                 <a href="https://github.com/Neilketchum/Covid-Tracker"><i class="fab fa-github fa-5x"></i></a>
                  
              </div>
              <div className = 'Love'>
                  <div className = 'c1'>
                    By
                  </div >
                  <div className = 'c2'>
                    <i class="fas fa-heart fa-3x"></i>
                  </div>
                  <div className = 'c3'>
                    Daipayan Hati
                  </div>
              
              </div>
     </div>
     </div>
   );
 }
 export default App;