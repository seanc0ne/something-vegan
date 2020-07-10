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
    cocktails = await getCocktailsByIngredient(ingredientName);
    console.log(cocktails);
}

function loadSearchHistory() {
  searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
}

function saveSearchHistory(searchTerm) {
  // save to localStorage
  searchHistory.push(searchTerm);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  // appear in search-history container
  console.log(searchHistory);
}

function displaySearchHistory() {
  // reference to container
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

//Daniel - this needs to be called in the 'ingredient search button' click handler
//showCocktails(ingredientName);

    // TODO: call fetch()
    // TODO: Return the array of restaurant objects from the server response
    //   return <THE RESULTS>;
// Prerequisite:
// - Edit 'style.css' and add a new class called 'recipe-card':
// .recipe-card {
//   max-width: 18rem;
// }
// .recipe-image {
//   max-width: 200px;
// }
// .recipe-link {
// }
// .recipe-url {
// }
// .recipe-text {
//}
//1. Modify index.html and DELETE everything inside the "searchResults" div so that it only looks like this:
//<div class="row" id="searchResults"></div>
//2. In your script.js, you're going to declare a variable that references this 'searchResults' div:
//  var searchResultsDiv = document.querySelector('#searchResults');
//3. In showRecipes() function, we are going to build a card for each recipe dynamically.
// <div class="card text-white bg-primary mb-3 recipe-card">
//   <div class="card-body">
//     <h5 class="card-title">Primary card title</h5>
//     <p class="card-text">
//        <img src="url-to-image" class="recipe-image" />    
//        <div class="recipe-link">
//          <a href="url-to-recipe" class="recipe-url">Click here</a> 
//          <span class="recipe-text"> to see recipe.</span>
//        </div>
//     </p>
//   </div>
// </div>
async function showRecipes(searchText) {
  var cardDiv;
  var cardBodyDiv;
  var h5;
  var p;
  var recipeImage;
  var recipeLink;
  var recipeURL;
  var recipeText;
  var recipe; // variable for a single recipe
  // Get recipes and assign to recipes array
  recipes = await getRecipesByKeyword(searchText);
  console.log(recipes);
//     console.log(recipes);
  // TODO: loop through the entire recipes array
  let searchResultsDiv = document.querySelector('.results-container');
  searchResultsDiv.innerHTML = '';

  for (var i = 0; i < recipes.length; i++) {
    recipe = recipes[i];
    cardDiv = document.createElement('div'); // <div></div>
    cardDiv.classList.add('card');
    cardDiv.classList.add('text-white');
    cardDiv.classList.add('bg-primary');
    cardDiv.classList.add('mb-3');
    cardDiv.classList.add('recipe-card'); // Need to define this in style.css
    cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');
    h5 = document.createElement('h5');
    h5.classList.add('card-title');
    h5.textContent = recipe.title;
    p = document.createElement('p');
    p.classList.add('card-text');
    // The conntent would be the image of the recipe
    // and a link to the actual recipe
    recipeImage = document.createElement('img');
    recipeImage.classList.add('recipe-image'); // <img src="" class="recipe-image" />
    recipeImage.src = 'https://spoonacular.com/recipeImages/' + recipe.image;
    recipeLink = document.createElement('div'); // recipeLink = <div></div>
    recipeLink.classList.add('recipe-link'); // recipeLink = <div class="recipe-link"></div>
    recipeURL = document.createElement('a'); // recipeURL is now  <a></a>
    recipeURL.classList.add('recipe-url'); // recipeURL is now <a class="recipe-url"></a>
    recipeURL.href = recipe.sourceUrl; // recipeURL is now <a href="sourceUrl" class="recipe-url"></a>
    recipeURL.textContent = "Click here"; // recipeURL is now <a href="sourceUrl" class="recipe-url">Click here</a> 
    // recipeURL = <a href="whatever" class="recipe-url">Click here</a> 
    recipeText = document.createElement('span');
    recipeText.classList.add('recipe-link-text');
    recipeText.textContent = " to see recipe";
    // Are we done?  Nope, not so fast.  It's time
    // to re-unite the children with their parents
    recipeLink.appendChild(recipeURL); 
    // After running the statement above, recipeLink now looks like this                 
//     <div class="recipe-link">
//        <a href="whatever" class="recipe-url">Click here</a> 
//     </div>
    recipeLink.appendChild(recipeText);                           
    // After running the statement above, recipeLink now looks like this                 
//     <div class="recipe-link">
//        <a href="whatever" class="recipe-url">Click here</a> 
//        <span class="recipe-text"> to see recipe.</span>
//     </div>
    p.appendChild(recipeImage);
//     <p class="card-text">
//       <img src="url-to-image" class="recipe-image" />
//     </p>
    p.appendChild(recipeLink);
//     <p class="card-text">
//       <img src="url-to-image" class="recipe-image" />
//       <div class="recipe-link">
//          <a href="whatever" class="recipe-url">Click here</a> 
//          <span class="recipe-text"> to see recipe.</span>
//       </div>
//     </p>
    cardBodyDiv.appendChild(h5);
    cardBodyDiv.appendChild(p);
    cardDiv.appendChild(cardBodyDiv);
    searchResultsDiv.appendChild(cardDiv); // We have inserted our first card
  }
}

function initialize() {
  // check localStorage for search history data
  // add the click event listeners to buttons (recipes and cocktails)
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
  // render search history
  displaySearchHistory();
}

initialize();