var searchText = "quinoa"; // testing eliminate and substitute for the input

const API_KEY = "ed7605a56f0f435ab0d285c4b6650cf0 ";
var recipes = [];
var cocktails = [];
var recipeSearchBtn = document.querySelector('.recipe-search-btn');
var cocktailSearchBtn = document.querySelector('.cocktail-search-btn');
let searchHistory = [];


async function getRecipesByKeyword(searchText) {
    let apiURL = "https://api.spoonacular.com/recipes/search?";
    let queryString = "query=" + searchText + "&number=6&diet=vegan&apiKey=" + API_KEY;
    // Combined apiURL and queryString
    apiURL = apiURL + queryString;
    console.log(apiURL);
    let response = await fetch(apiURL);
    let data = await response.json();
    return data.results;
}

var ingredientName = "tequila"; // testing eliminate and substitute for the input

async function getCocktailsByIngredient(ingredientName) {
    let apiURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?";
    let queryString = "i=" + ingredientName + "&number=6";
  
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

function loadSearchHistory() {
  searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
}

function saveSearchHistory(searchTerm) {
  
  searchHistory.push(searchTerm);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

  console.log(searchHistory);
}

function displaySearchHistory() {

  let searchHistoryContainer = document.querySelector('.search-history');
  let ulContainer = document.createElement('ul');
  let liContainer;
  let searchList = searchHistory;

  searchHistoryContainer.innerHTML = '';
  searchList.reverse();

  for (let i = 0; i < searchList.length; i++) {
    liContainer = document.createElement('li');
    liContainer.textContent = searchList[i];
    ulContainer.appendChild(liContainer);
  }
  searchHistoryContainer.appendChild(ulContainer);
}

async function showRecipes(searchText) {
  var cardDiv;
  var cardBodyDiv;
  var h5;
  var p;
  var recipeImage;
  var recipeLink;
  var recipeURL;
  var recipeText;
  var recipe; 
  recipes = await getRecipesByKeyword(searchText);
  console.log(recipes);

  let searchResultsDiv = document.querySelector('#unorder-list');
  searchResultsDiv.innerHTML = '';

  for (var i = 0; i < recipes.length; i++) {
    recipe = recipes[i];
    cardDiv = document.createElement('li');
    cardDiv.classList.add('card');
    cardDiv.classList.add('text-white');
    cardDiv.classList.add('bg-primary');
    cardDiv.classList.add('mb-3');
    cardDiv.classList.add('recipe-card'); 
    cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');
    h5 = document.createElement('h5');
    h5.classList.add('card-title');
    h5.textContent = recipe.title;
    p = document.createElement('p');
    p.classList.add('card-text');
    recipeImage = document.createElement('img');
    recipeImage.classList.add('recipe-image'); 
    recipeImage.src = 'https://spoonacular.com/recipeImages/' + recipe.image;
    recipeLink = document.createElement('div');
    recipeLink.classList.add('recipe-link');
    recipeURL = document.createElement('a');
    recipeURL.classList.add('recipe-url');
    recipeURL.href = recipe.sourceUrl;
    recipeURL.textContent = "Click here";
    
    recipeText = document.createElement('span');
    recipeText.classList.add('recipe-link-text');
    recipeText.textContent = " to see recipe";
    
    
    recipeLink.appendChild(recipeURL); 

    recipeLink.appendChild(recipeText);                           
   
    p.appendChild(recipeImage);

    p.appendChild(recipeLink);

    cardBodyDiv.appendChild(h5);
    cardBodyDiv.appendChild(p);
    cardDiv.appendChild(cardBodyDiv);
    searchResultsDiv.appendChild(cardDiv);
  }
}

function initialize() {

  recipeSearchBtn.addEventListener('click', function(event) {
    var recipeSearchText = document.querySelector('.recipe-search-input');

    event.preventDefault();
    showRecipes(recipeSearchText.value); 
    saveSearchHistory(recipeSearchText.value);
    displaySearchHistory();

  });
  
  cocktailSearchBtn.addEventListener('click', function(event) {
    var cocktailSearchText = document.querySelector('.cocktail-search-input');
    
    showCocktails(cocktailSearchText.value);
      event.preventDefault();
  });
  
  displaySearchHistory();
}

async function showCocktails(ingredientName) {
  var cardDiv;
  var cardBodyDiv;
  var h5;
  var p;
  var cocktailImage;
  var cocktailLink;
  var cocktailURL;
  var cocktailText;
  var cocktail;

  cocktails = await getCocktailsByIngredient(ingredientName);
  console.log(cocktails);

  let searchResultsDiv = document.querySelector('#unorder-list');
  searchResultsDiv.innerHTML = '';

  for (var i = 0; i < cocktails.length; i++) {
    cocktail = cocktails[i];
    cardDiv = document.createElement('li');
    cardDiv.classList.add('card');
    cardDiv.classList.add('text-white');
    cardDiv.classList.add('bg-primary');
    cardDiv.classList.add('mb-3');
    cardDiv.classList.add('recipe-card'); 

    cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    h5 = document.createElement('h5');
    h5.classList.add('card-title');
    h5.textContent = cocktail.title;

    p = document.createElement('p');
    p.classList.add('card-text');

    cocktailImage = document.createElement('img');
    cocktailImage.classList.add('recipe-image'); 

    cocktailImage.src = cocktail.strDrinkThumb;

    cocktailLink = document.createElement('div'); 
    cocktailLink.classList.add('recipe-link'); 

    cocktailURL = document.createElement('a');
    cocktailURL.classList.add('recipe-url');
    cocktailURL.href = cocktail.sourceUrl; 

    cocktailText = document.createElement('span');
    cocktailText.classList.add('recipe-link-text');
    cocktailText.textContent = cocktail.strDrink;

    cocktailLink.appendChild(cocktailURL);
    cocktailLink.appendChild(cocktailText);
    p.appendChild(cocktailImage);
    p.appendChild(cocktailLink);
    cardBodyDiv.appendChild(h5);
    cardBodyDiv.appendChild(p);
    cardDiv.appendChild(cardBodyDiv);
    searchResultsDiv.appendChild(cardDiv); 
  }
}

initialize();