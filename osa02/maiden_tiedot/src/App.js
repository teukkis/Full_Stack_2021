import React, { useState, useEffect } from 'react';
import axios from 'axios'

const COUNTRIES_MAX = 10

const DisplayCountries = (props) => {
  const countryName =  props.country.name 
  const countryToDisplay = countryName.charAt(0).toUpperCase() + countryName.slice(1)
  return (
    <p>{countryToDisplay}</p>
  )
}

const DisplayInfo = ({info}) => {
  const countryName = info[0].name.charAt(0).toUpperCase() + info[0].name.slice(1)
  return (
    <div>
      <h2>{countryName}</h2>
      <p>capital {info[0].capital}</p>
      <p>population {info[0].population}</p>
      <h4>languages</h4>
      <ul>
        {
        info[0].languages.map( (lng, i) => 
          <li key={i}>{lng.name}</li>
          )
        }
      </ul>
      <img src={info[0].flag} alt="cant find" width="10%" height="10%"/>
    </div>
  )
}

const DisplayWeather = ({weatherInfo}) => {
  console.log(weatherInfo)
  return (
    <div>
      <h3>Weather in {weatherInfo.location.name}</h3>
      <p><strong>temperature: </strong>{} Celsius</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState(countries)
  const [weatherInfo, setWeatherInfo] = useState({})
  
  useEffect(() => {
    axios 
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const arrayInLowerCase = response.data.map( v => {
          return { ...v, name: v.name.toLowerCase() }
        })
        setCountries(arrayInLowerCase)
        }) 
      }, [])
  
  const handleSearch = (event) => {
    setSearch(event.target.value)
    setFiltered(countries.filter(val => val.name.includes(event.target.value)))
  }

  const handleShow = (country) => {
    setFiltered([country])
  }

  const renderMatches = () => {
  
    if (filtered.length <= COUNTRIES_MAX && filtered.length > 1) { 
     return filtered.map( (ctr, i) => {
      return (
        <div key={i}>
          <DisplayCountries country={ctr}/>
          <button onClick={() => handleShow(ctr)}>show</button>
        </div>
      )
     })
    } 
    
    else if (filtered.length === 1) {
      return (
        <div>
          <DisplayInfo info={filtered} />
          {weatherInfo.location !== undefined ? <DisplayWeather weatherInfo={weatherInfo}/> : <div></div>}
        </div>
      )
    } 

    else {
      return <p>Too many matcher, specify another filter</p>
    }
  }
 
  return (
    <div>
        find countries <input value={search} onChange={handleSearch}/>
      {renderMatches()}
    </div>

  )
}

export default App;
