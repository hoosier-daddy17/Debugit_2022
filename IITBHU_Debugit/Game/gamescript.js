 /* Game Buttons */
 function start(){
     document.getElementById("start").style.visibility="hidden";
     document.getElementById("rock").style.visibility="visible";
     document.getElementById("paper").style.visibility="visible";  
     document.getElementById("scissors").style.visibility="visible";
 }

 /* Fist Actions */
 clickLeftFist=["<img src='rock.png' id='pic1'>","<img src='paper.png' id='pic1'>","<img src='scissors.png' id='pic1'>"];
 clickRightFist= ["<img src='rock.png' id='pic2'>","<img src='paper.png' id='pic2'>","<img src='scissors.png' id='pic2'>"];
 function play(position){
     document.getElementById("pic1").style.animation='shakeLeft 1s 5 ease-in-out';
     document.getElementById("pic2").style.animation='shakeRight 1s 5 ease-in-out';
     var random= Math.floor(Math.random()*3);
     setTimeout(() => {
         document.getElementById("fist2").innerHTML=clickRightFist[random];
         document.getElementById("fist1").innerHTML=clickLeftFist[position];
         

     }, 5000);

     /* All possible cases- Draw/Win/Lose */
     setTimeout(() => {
if(random==position){
    alert("It is A DRAW! Play Again!");
    window.location.reload();
}
else if(position==0 && random==2){
    alert("WUHOO! You WON!!! Congrats!");
    window.location.reload();
}
else if(position==1 && random==0){
    alert("WUHOO! You WON!!! Congrats!");
    window.location.reload();
}
else if(position==2 && random==1){
    alert("WUHOO! You WON!!! Congrats!");
    window.location.reload();
}
else{
    alert("OH NO! You lost! Better Luck Next Time <3");
    window.location.reload();
}

     }, 5500);
 }
