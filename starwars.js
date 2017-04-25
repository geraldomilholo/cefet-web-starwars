// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para carregar:
//  - A lista de filmes
//  - A introdução de cada filme, quando ele for clicado

let _carregarLastMovie = function () {

	let film = localStorage.getItem('lastMovie');
	if (film != null) {
		
		film = JSON.parse(film);

		let text = "Episode " + film.episode_id + " <br> " + film.opening_crawl;
		let $readingAnimation = $('.reading-animation');
  		$readingAnimation.empty();
  		$readingAnimation.append(text);

	}

}();

let _getFilms = function (){

	$.ajax({
		url: 'http://swapi.co/api/films/',
	  	method: 'GET',
	  	success: function(resposta) {
	    		
	  		let $moviesList = $("#movies").find("ul");
			$moviesList.find("li").remove(); 

			let results = resposta.results;
			for (let i = 0; i < results.length; i++) {

				let filmId = results[i].episode_id;
				let episodeTitle = "Episode " + filmId;
				
				let newElement = '<li data-episode-url="' + results[i].url + '">' + episodeTitle + '</li>';
				$moviesList.append(newElement);
			}

			_showFilm($moviesList);
			
		}
	});

}();

let _showFilm = function ($moviesList) {

	$moviesList.find("li").on('click', function(event) {

		let $li = event.currentTarget;
		let _url = event.currentTarget.getAttribute("data-episode-url");

		$.ajax({
			url: _url,
		  	method: 'GET',
		  	success: function(film) {
		    	
		  		let text = "Episode " + film.episode_id + " <br> " +  film.opening_crawl;
		  		let $readingAnimation = $('.reading-animation');

		  		$readingAnimation.empty();
		  		$readingAnimation.append(text);

		  		localStorage.setItem('lastMovie', JSON.stringify(film));
			}
		});
	});
};