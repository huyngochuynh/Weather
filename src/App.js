import React, { useState , useEffect } from 'react';
import "./App.css"


function App() {
   const [searchInput, setSearchInput] = useState("");
   const [searchCity, setSearchCity] = useState("");
   const [weatherInfo, setWeatherInfo] = useState("");
   const [loading, setLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   useEffect(() => {
      const fetchWeatherData = async () => {
         if (!searchCity) return;

         setLoading(true);
         try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=83b62f305d8b052317cd83214c937324`
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok) {
               setWeatherInfo(`${data.name}, ${data.sys.country}, ${data.weather[0].description}`);
               setErrorMessage("");
            } else {
               setErrorMessage(data.message);
            } 
         } catch (error) {
            setErrorMessage(error.message);
         }
         setLoading(false);
      }
      fetchWeatherData();
   }, [searchCity])
   

   const handleSubmit = (e) => {
      e.preventDefault();
      setSearchCity(searchInput);
   }

   const Content = () => {
      if (loading) {
         return <div>Loading...</div>
      }
      if (errorMessage) {
         return <div style={{color: "red"}}>{errorMessage}</div> 
      }
      return <div>{weatherInfo}</div>
   }

   return (
      <>
         <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder="City" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            />
            <button>Search</button>
         </form>         
         <div>{Content()}</div>
      </>
   );
}

export default App;