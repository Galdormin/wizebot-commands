$(document).ready(function(){

    $('#button').on('click', function() {

var name = $("input").val()
$("#name").text(name)

/* ------------------------------------------- 
---------------- Copy from here --------------
---------------------------------------------- */ 

var time = 10; // Duration of the command
var nb_pokemon = 905; // Number of pokemon

$(".screen_div").css({
    "font-family": "'VT323', monospace", 
    "font-size": "26px",
    "color": "white",
    "text-shadow": "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
    "text-align": "center"
});
$(".screen_div").html(
    "<style>@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');</style>" +
    "<h1>Cette semaine <a id=name>$@(display_name)</a> est :</h1>" + 
    "<img id=img-pokemon src=''>"
).fadeIn(1500);

// Hash for string
String.prototype.hashCode = function() {
    var hash = 0,
    i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

// Compute ISO Week number
Date.prototype.getWeekNumber = function(){
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 2 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
};

var display_name = $("#name").text();
var date = new Date();

var hash = (date.getWeekNumber() + date.getFullYear() + display_name).hashCode();
var number = Math.abs(hash) % nb_pokemon + 1;

var url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + number + '.png';
$("#img-pokemon").attr("src", url);

var audio = new Audio('https://github.com/Galdormin/wizebot-commands/raw/dev-command-pokemon/what-pokemon-are-you/resources/cries/' + number + '.ogg');
audio.volume = 0.2;
audio.play();

setTimeout(function() {
    $(".screen_div").fadeOut(1000);
}, (time*1000));

/* ------------------------------------------- 
------------------- To here ------------------
---------------------------------------------- */ 

$(".screen_div").find("#name").text(name)
    })
});