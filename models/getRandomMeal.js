const axios = require('axios');

var receitinha = axios.get('https://www.themealdb.com/api/json/v1/1/random.php').then(function (response) {
    var data = response.data;
    var meal = data.meals;
    var nameMeal = meal[0].strMeal;
    var imgMeal = meal[0].strMealThumb;
    var instrucoes = meal[0].strInstructions
    var ingredientes = [];
    for (var i = 1; i<=20; i++){
        if (meal[0][`strIngredient${i}`]) {
			ingredientes.push(
				`${meal[0][`strIngredient${i}`]} - ${meal[0][`strMeasure${i}`]}`
			);
        }
    }
    //país = strArea
    return [nameMeal, imgMeal, instrucoes, ingredientes];
});

module.exports = receitinha;