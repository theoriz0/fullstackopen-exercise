import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Detail = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`flag of ${country.name}`}/>
    </div>
  )
}

const Result = ({countries}) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => <p key={country.numericCode}>{country.name}</p>)}
      </div>
    )
  } else if (countries.length > 0) {
    return (
      <Detail country={countries[0]} />
    )
  } else {
    return <p>No matches</p>
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('a')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled', response)
        setCountries(response.data)
        console.log(countries)
      })
  }, [])

  const filterByName = (country) => {
    return country.name.toLowerCase().includes(filter.toLowerCase())
  }


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(filterByName)

  return (
    <div>
      <div>
        find countries<input value={filter} onChange={handleFilterChange}/>
        <Result countries={countriesToShow}/>
      </div>
    </div>
  )
}

export default App