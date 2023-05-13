const apiKey = "7d2c003e8cfb57f2d833913521a7879e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=matric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{

    var data = await response.json();
    var temp = data.main.temp-273.15;
    //let d = new Date();
    let timezone = 19800;
    let sunrise = 1683592412;
    let x = moment.utc(sunrise,'X').add(timezone,'seconds').format('HH:mm a');
    let sunset = 1683638915;
    let y = moment.utc(sunset,'X').add(timezone,'seconds').format('HH:mm a');
    
  
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".sunrise").innerHTML = x ;
    document.querySelector(".sunset").innerHTML = y ;


    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "./weather-app-img/images/clouds.png";
    }

    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "./weather-app-img/images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "./weather-app-img/images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "./weather-app-img/images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "./weather-app-img/images/mist.png";
    }
    
    document.querySelector(".weather").style.display = "block"
    document.querySelector(".error").style.display = "none";
}
}


searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
