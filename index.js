let base_url = "https://api.openweathermap.org/data/2.5/weather?q=";
let apiKey = "d1845658f92b31c64bd94f06f7188c9c";
let city = document.querySelector(".city");
let button = document.querySelector(".btn");
let temp = document.querySelector(".temp");
let details = document.querySelector(".detail");
let icon = document.querySelector(".icon");
let humidity = document.querySelector(".humidity");
let visibility = document.querySelector(".visibility");
let area = document.querySelector(".city-name")

let defaultCity = "london";


async function getData(cityName, apiKey) {
    try{let base_url = "https://api.openweathermap.org/data/2.5/weather?q=";
    let ogApi = `${base_url}${cityName}&appid=${apiKey}&units=metric`;
    let rData = await fetch(ogApi);
    let data = await rData.json();
    return{
        city: data.name,
        temp : data.main.temp,
        details: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity:data.main.humidity,
        visibility: data.visibility

    }
    }
    catch{
        throw new Error("Weather update not available");
        
    }
    
}
function updateWeather(data){
    area.textContent = data.city;
    temp.textContent = `${data.temp}°C`;
    details.textContent = data.details;
    humidity.textContent = `${data.humidity}%`;
    visibility.textContent = `${data.visibility / 1000} km`;
    
    // Log the icon to debug
    console.log("Weather icon code:", data.icon);
    
    // Handle sun (01d) and cloud (02d/03d etc.) cases specifically
    if (data.icon === "01d" || data.icon === "01n") {
        icon.src = "https://img.icons8.com/emoji/96/sun-emoji.png"; // Replace with a visible sun
    } else {
        icon.src = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;
    }
}
getData(defaultCity, apiKey).then((data) => {
    updateWeather(data);
}).catch((err) => {
    console.log(err);
    alert("Error fetching data: " + err.message);
});
button.addEventListener("click",()=>{
    let cityName = city.value.trim();
    
    getData(cityName,apiKey).then((data)=>{
        temp.textContent = `${data.temp}°C`;
        area.textContent = data.city;
        details.textContent = data.details;
        humidity.textContent = `Humidity: ${data.humidity}%`;
        visibility.textContent = ` Visibility: ${data.visibility / 1000} km`;
        icon.src = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;
    
    }).catch((err)=>{
        console.log(err)
    })
})


