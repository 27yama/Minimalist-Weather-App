import react, {useState} from "react";

const API = {
  key: "KEY",
  baseurl: "BASEURL"
}

function App() {

  /*
  const createDate = (dt) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[dt.getDay()];
    let date = dt.getDate();
    let month = months[dt.getMonth()];
    let year = dt.getFullYear();
    return `${day}, ${date}, ${month}, ${year}`
  }
  */

  const [query, setQuery] = useState('');
  const [weather, setweather] = useState({});

  const search = (evnt) => {
    if (evnt.key === "Enter"){
      fetch(`${API.baseurl}weather?q=${query}&units=metric&APPID=${API.key}`)
      .then(result => result.json())
      .then(returned => {
        setweather(returned);
        setQuery("");
        console.log(returned);
      });
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.weather[0].main == "Clear" ? ('AppClear') : (weather.weather[0].main == "Clouds" ? ('AppClouds') : (weather.weather[0].main == "Mist" ? ('AppMist') : weather.weather[0].main == "Snow" ? ('AppSnow') : weather.weather[0].main == "Smoke" ? ('AppSmoke') : (weather.weather[0].main == "Fog" ? ('AppFog') : weather.weather[0].main == "Rain" ? ('AppRain') : 'App'))))) : 'AppNotFound'}>
      <main>
        <div className="search">
          <input
            type="text"
            className="search-bar"
            placeholder = "Countries, Cities, Towns"
            onChange = {qr => setQuery(qr.target.value)}
            value = {query}
            onKeyPress = {search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
        <div className="location-bar">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{new Date( new Date().getTime() + weather.timezone * 1000).toUTCString().replace( / GMT$/, "" )}</div>
        </div>
        <div className="weather-bar">
          <div className="temperature">
            {Math.round(weather.main.temp)}°c
          </div>
          <div className="weatherStatus"> {weather.weather[0].main} </div>
            </div>
        </div>
        ) : (<div className="NotFound"> Location Not Found </div>)}
      </main>
    </div>
  );
}

export default App;
