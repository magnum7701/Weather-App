const weatherForm=document.querySelector(".weatherform")
const cityInput=document.querySelector(".cityinput")
const card=document.querySelector(".weather")
const apiKey="9f0aab624ff11f29fa3995bab5229eb1"

weatherForm.addEventListener("submit",async event=>{

    event.preventDefault()
    const city = cityInput.value
    if(city){
        try{
            const weatherData = await getWeatherData(city)
            displayWeatherInfo(weatherData)
        }
        catch(error){
            console.error(error)
            displayError(error)

        }

    }   
    else{
        displayError("Please Enter a Valid City !")
    }

})

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl)
    if(!response.ok){
        throw new Error("NOT A VALID CITY NAME") 
    }
    return await response.json()
}

function displayWeatherInfo(data){
    const{name : city, 
        main: {temp,humidity},
        weather: [description, id]}=data

    card.textContent=""
    card.style.display="flex"
    
    const cityDisplay=document.createElement("h1")
    const tempDisplay=document.createElement("p")
    const humidityDisplay=document.createElement("p")
    const descDisplay=document.createElement("p")
    const weatherEmoji=document.createElement("p")

   cityDisplay.textContent=city
   tempDisplay.textContent=`${(temp - 273.15).toFixed(1)}°C`
   humidityDisplay.textContent=`Humidity : ${humidity}%`
   descDisplay.textContent=description.description
   //weatherEmoji.textContent=
   tempDisplay.classList.add("liveweather")
   cityDisplay.classList.add("liveweather")
   humidityDisplay.classList.add("liveweather")
   descDisplay.classList.add("liveweather")
   card.appendChild(cityDisplay) 
   card.appendChild(tempDisplay)
   card.appendChild(descDisplay) 
   card.appendChild(humidityDisplay) 


}

/*function getWeatherEmoji(weatherId){

}*/

function displayError(messsage){
    const disp=document.createElement("p")
    disp.textContent=messsage
    disp.classList.add("weather")
    card.textContent=""
    card.style.display="flex"
    card.appendChild(disp)

}