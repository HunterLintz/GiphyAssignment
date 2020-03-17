var pokemon = ["Pikachu","Ditto","Mew","Meowth","Lapras","Darkrai","Squirtle","Charizard"];
var pokeCheck = [];
var json = $.getJSON("https://raw.githubusercontent.com/sindresorhus/pokemon/master/data/en.json",function(data){
	$.each(data,function(i,v){
		pokeCheck.push(v.toLowerCase());
	});
	console.log(pokeCheck);
});
var currentPokemon;
$( document).ready(function(){
	for (i = 0; i < pokemon.length; i++){
		$("#button-container").append("<button class ='monsterButton' value = '"+pokemon[i]+"' type='button'>"+pokemon[i]+"</button>")
	}
	$("#button-container").on("click",".monsterButton",function(){
		currentPokemon = $(this).val();
		loadImages();
	});
	function loadImages(){
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentPokemon +"+%20pokemon&rating=PG&=&api_key=FEC4atVGyyKs8JkSHVUQyI0bto3q6rDC&limit=10";
		$("#gif-container").empty();
		$.ajax({
			url:queryURL,
			method:"GET"
		})
			.then(function(response){
				for (v = 0; v < response.data.length;v++){
					$("#gif-container").append("<span class = 'gifs'><img src='"+ response.data[v].images.original.url +"'><div class='rating'>Rating: "+response.data[v].rating+"</div></span>")
				}
			});
	};
	$("#submit").on("click",function(){
		var poke = $("#addMonster").val().toLowerCase();
		poke = poke.replace(/\s/g, '');
		console.log(poke);
		var pokemane = $.inArray(poke,pokeCheck);
		console.log(pokemane)
		if (pokemane == -1){
			testAlertON();
		}else{
			poke = poke.toString().substring(0, 1).toUpperCase() + poke.toString().substring(1);
			if($.inArray(poke,pokemon)== -1){
				pokemon.push(poke);
				$("#button-container").append("<button class = 'monsterButton' value = '"+ poke +"' type='button'>"+poke+"</button>");
				currentPokemon = poke;
				loadImages();
			}else{
				currentPokemon = poke;
				loadImages();
			}
		}
		$("#addMonster").val("");
	});
	function testAlertON(){
		$('#alert').css('width','50%');
		$('#alertText').css('opacity','1');
		setTimeout(function(){testAlertOFF();},5000);
		}
		
		function testAlertOFF(){
		$('#alert').css('width','0px');
		$('#alertText').css('opacity','0');
		}
});