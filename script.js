function start_game(){
   let select = document.getElementById("level");
   let level = select.options[select.selectedIndex].value;
   window.location.href = "game.html?" + level;
}

function music_play(){
   let music = new Audio("music\\High School DxD Born OST - 31 - Soshite…_160k.mp3");
   music.volume = 0.004;
   music.play();
   music.loop = true;
}

function game(){
   let url = window.location.search;
   let level = url.replace("?", "");
   let seconds = 0;
   music_play();

   switch(parseInt(level)){
      case 1:
         seconds = 120;
         break;
      case 2:
         seconds = 60;
         break;
      case 3:
         seconds = 30
         break;
   }
   document.getElementById("seconds").innerHTML= seconds;

   var balloons_number = 90;
   balloons_generator(balloons_number);
   document.getElementById("full").innerHTML = balloons_number;
   document.getElementById("broken").innerHTML = 0;
   
   timer(seconds)
   
}

function balloons_generator(balloons_number){
   for(let i = 1; i <= balloons_number; i++){
      let balloons = document.createElement("img");
      balloons.src = "img\\ballon small.png";
      balloons.style.padding = "12px";
      balloons.class = "balloons_small"
      balloons.style.width ="55px";
      balloons.style.justifyItems = "center";
      balloons.setAttribute("class", "balloons_game")
      document.getElementById("background").appendChild(balloons);
      balloons.onclick = function(){pop(this)};
      balloons.id = "b" + i;
      
      

   }
}

let time;

function  timer(seconds){
   if( seconds == -1){
      clearTimeout(time);
      status_game(null, seconds, null);
      return false
   }
   
   document.getElementById("seconds").innerHTML = seconds;
   seconds = seconds - 1;
   time = setTimeout(`timer(${seconds})`, 1000);
}
  


function pop(balloons){
   let balloons_id = balloons.id;
   document.getElementById(balloons_id).setAttribute("onclick", "")
   document.getElementById(balloons_id).src = "img\\ballon-pop-small.png"
   points()
   
}

function points(){
   let balloons_full = document.getElementById("full").innerHTML;
   let balloons_pop = document.getElementById("broken").innerHTML;

   balloons_full = parseInt(balloons_full) - 1;
   balloons_pop = parseInt(balloons_pop) + 1;

   document.getElementById("full").innerHTML = balloons_full;
   document.getElementById("broken").innerHTML = balloons_pop;
   status_game(balloons_full, null)
}


function status_game(balloons_full, seconds){
   let alert_game = document.getElementById("alert_gamestatus");
   let status_text = document.getElementById("status");
   if( balloons_full == 0){
      alert_game.setAttribute("class", "alert alert-success");
      status_text.innerHTML = "You Win";
      clearTimeout(time);

   }

   if(seconds == -1){
      let balloons_game = document.getElementsByClassName("balloons_game").length;
      alert_game.setAttribute("class", "alert alert-danger");
      status_text.innerHTML = "Game Over";
      for(let i = 0; i <= balloons_game;){
        let balloons_id = "b"+ balloons_game;
        document.getElementById(balloons_id).setAttribute("onclick", "")
         balloons_game = balloons_game - 1;
      }
   }
}

