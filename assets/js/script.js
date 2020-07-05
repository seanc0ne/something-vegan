// HTML
// ====
// <input type-"text" id="recipeSearch" /> <button>Go</button>
// <input type-"text" id="ingredientSearch" /> <button>Go</button>
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Javascript
// ==========
// Best Practice 
//   - put all variable declarations and function definitions at the top of the Javascript file

var searchText = "quinoa" // testing eliminate and substitute for the input

const API_KEY = "ed7605a56f0f435ab0d285c4b6650cf0 ";
var recipes = [];
var cocktails = [];

async function getRecipesByKeyword(searchText) {
    let apiURL = "https://api.spoonacular.com/recipes/search?";
    let queryString = "query=" + searchText + "&number=6&diet=vegan&apiKey=" + API_KEY;
    // Combined apiURL and queryString
    apiURL = apiURL + queryString;
    console.log(apiURL);
    let response = await fetch(apiURL);
    let data = await response.json();
    return data;
}

async function showRecipes(searchText) {
    let results = await getRecipesByKeyword(searchText);
    console.log(results);
}

showRecipes(searchText);

var ingredientName = "tequila" // testing eliminate and substitute for the input

async function getCocktailsByIngredient(ingredientName) {
    let apiURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?";
    let queryString = "i=" + ingredientName + "&number=6";
    // Combined apiURL and queryString
    apiURL = apiURL + queryString;
    console.log(apiURL);
    let response = await fetch(apiURL);
    let data = await response.json();
    let result = [];
    for (let i = 0; i < 6; i++) {
        result.push(data.drinks[i])
    }
    return result;
}

async function showCocktails(ingredientName) {
    let results = await getCocktailsByIngredient(ingredientName);
    console.log(results);
}

showCocktails(ingredientName);

    // TODO: call fetch()
    // TODO: Return the array of restaurant objects from the server response
    //   return <THE RESULTS>;

// Attach click event handlers for the GO buttons
// recipeGoBtn.on('click', function() {
//   var recipeSearchText = // TODO: grab value of recipe search input field
//   // Call the function that searches for recipies 
//   // passing recipeSearchText
//   recipes = getRecipesByKeyword(recipeSearchText);
// });
// ingredientGoBtn.on('click', function() {
//   var ingredientSearchText = // TODO: grab value of city search input field
//   // Call the function that searches for restaurants by using
//   // citySearchText
//   cocktails = getCocktailsByIngredient(ingredientSearchText);
// });
