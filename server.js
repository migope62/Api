const express = require('express')
const app = express()
const https = require('https')
const bodyParser = require('body-parser')
const ejs = require('ejs')

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))

app.get('/', (req, res) => {
    /*const tab = ["citron", "pasteque", "pomme", "banane"]
    const fruit = tab[Math.floor(Math.random() * 4)]

    Nous allons envoyer vers le template le fruit 
    res.render('home', { object: fruit })*/
    res.render('index', {})
})
app.post('/', (req, res) => {
    const ville = req.body.ville
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=2bbad18e41e60d27b798f6edff578853&units=metric"
    https.get(url, (response) => {

        response.on("data", (data) => {
            const tableau_weather = []
            const meteo_data = JSON.parse(data)
         
            
            const meteo = {
                city: ville,
                temperature: meteo_data.main.temp,
                description: meteo_data.weather[0].description,
                icon: meteo_data.weather[0].icon
            }
            tableau_weather.push(meteo)
            res.render('weather', { tableau: tableau_weather })



        })
    })

})

app.listen(3003, () => {
    console.log('le serveur est lancé')
}) 