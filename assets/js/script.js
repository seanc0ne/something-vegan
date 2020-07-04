HTML
====
<input type-"text" id="recipeSearch" /> <button>Go</button>
<input type-"text" id="ingredientSearch" /> <button>Go</button>
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Javascript
==========
Best Practice 
  - put all variable declarations and function definitions at the top of the Javascript file
const API_KEY = "ed7605a56f0f435ab0d285c4b6650cf0 ";
var recipes = [];
var cocktails = [];
function getRecipiesByKeyword(searchText) {
  var apiURL= "https://api.spoonacular.com/recipes/search?";
  var queryString = "query=" + searchText + "&number=6&diet=vegan&apiKey=" + API_KEY;
  // Combined apiURL and queryString
  apiURL = apiURL + queryString;
  // TODO: call fetch()
  // TODO: Return the array of recipe objectsw from the server response
  return <THE RESULTS>;
}
function getCocktailsByIngredient(ingredientName) {
  var apiURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?"
  var queryString = "i=" + ingredientName;
  // Combined apiURL and queryString
  apiURL = apiURL + queryString;
  // TODO: call fetch()
  // TODO: Return the array of restaurant objects from the server response
  return <THE RESULTS>;
}
// Attach click event handlers for the GO buttons
recipeGoBtn.on('click', function() {
  var recipeSearchText = // TODO: grab value of recipe search input field
  // Call the function that searches for recipies 
  // passing recipeSearchText
  recipes = getRecipesByKeyword(recipeSearchText);
});
ingredientGoBtn.on('click', function() {
  var ingredientSearchText = // TODO: grab value of city search input field
  // Call the function that searches for restaurants by using
  // citySearchText
  cocktails = getCocktailsByIngredient(ingredientSearchText);
});
