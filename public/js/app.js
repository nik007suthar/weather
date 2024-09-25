const weatherform = document.querySelector('form')
const search = document.querySelector('input')

const forecast = document.querySelector('#forecast')
const Temperatue = document.querySelector('#Temperature')
const Feels_like = document.querySelector('#Feels_like')
const date = document.querySelector('#date')

const temp = new Date();
let day = temp.getDate();
let month = temp.getMonth() + 1;
let year = temp.getFullYear();

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value
    
    fetch('http://localhost:3000/weather?Address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            console.log(data.error)
            else{
                
                date.textContent = day + '-' + month + '-' + year + ' ' +  weekday[temp.getDay()]
                forecast.textContent='Forecast: ' + data.forecast.Forecast 
                Temperature.textContent=data.forecast.Temperature + '°C'
                Feels_like.textContent='Feels like: ' + data.forecast.feelslike + '°C'
            }
        })
    })
})