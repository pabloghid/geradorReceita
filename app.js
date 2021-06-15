const express = require("express");
const app = express()
var getMeal = require("./models/getRandomMeal")
const path = require('path');
const axios = require('axios');

app.set("views", path.join(__dirname, "public"));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    getMeal.then(function(result){
        var nomeReceita     = result[0];
        var imgReceita      = result[1];
        var instrucoes      = result[2];
        var ingredientes    = result[3];
        res.render("index.pug", { name: nomeReceita, imag : imgReceita, instrucoes : instrucoes, ingredientes: ingredientes});
    });
});

app.post("/randomReceita", (req, res) => {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php').then(function (response) {
    var data = response.data;
    var meal = data.meals;
    var nmReceita = meal[0].strMeal;
    var imagReceita = meal[0].strMealThumb;
    var instrucoes = meal[0].strInstructions;
    var ingredientes = [];
    for (var i = 1; i<=20; i++){
        if (meal[0][`strIngredient${i}`]) {
			ingredientes.push(
				`${meal[0][`strIngredient${i}`]} - ${meal[0][`strMeasure${i}`]}`
			);
        }
    }
    res.render("index.pug", { name: nmReceita, imag : imagReceita, instrucoes : instrucoes, ingredientes: ingredientes});
    });
});

app.listen(3000);