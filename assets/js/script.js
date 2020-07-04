let APIkey = 'ed7605a56f0f435ab0d285c4b6650cf0'

let recipes = ['lasagna', 'compote', 'dessert', 'breakfast'];

let url = 'https://api.spoonacular.com/recipes/search?query=cheese&number=2&apiKey=ed7605a56f0f435ab0d285c4b6650cf0'

  fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data.results[0].title);
        console.log(data);
    });

    let apiKey2 = 'ab404a5992779eeb44786e20b8012874'

    var url_zomato = 'https://www.zomato.com/search?&apiKey2=ab404a5992779eeb44786e20b8012874'