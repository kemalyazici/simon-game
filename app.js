const sounds = {
    blue: 'sounds/blue.mp3',
    green: 'sounds/green.mp3',
    red: 'sounds/red.mp3',
    wrong: 'sounds/wrong.mp3',
    yellow: 'sounds/yellow.mp3',
}

const gameButtons = ['blue','green','red','yellow']
const game = [];
let orderCount = 0;
let order = "";
let level = 0;

document.addEventListener('keydown', computer);



function btnChanger(type){
    for(let btn of document.getElementsByClassName('btn')){
        if(type==="remove"){
            btn.removeAttribute('type','');
        }else{
            btn.setAttribute('type','button');
        }
    }
}

function getRandomBtn(){
    let index = Math.floor(Math.random()*4);
    return gameButtons[index];
}


function myPlayer(g) {     
    pressed(g);    
    new Audio(sounds[g]).play();   
   
  }


function computer() {    
    disable();
    level++;
    $('h1').html('Level ' + level);
    game.push(getRandomBtn());
    for(let i=0; i<game.length; i++){
        setTimeout(function(){
        myPlayer(game[i]);        
        }, 700*i);
    }
}

function pressed(g){
    document.getElementById(g).classList.add('pressed');
    setTimeout(() => {
        document.getElementById(g).classList.remove('pressed');    
    }, 100);
  }


 function disable()
{
    document.removeEventListener("keydown", computer);
}
function enable(event)
{
    document.addEventListener("keydown", computer);
    if(event==="yes"){
        keyBoardEvent();
    }
}

function keyBoardEvent(){
    const ke = new KeyboardEvent('keydown', {
        bubbles: true, cancelable: true, keyCode: 13
    });
    setTimeout(() => {
        document.body.dispatchEvent(ke);    
    }, 1000);
    
}

function gameOver(){
    $('h1').html('Game Over, Press Any Key to Restart');
    document.body.classList.add('game-over');    
    new Audio('sounds/wrong.mp3').play(); 
    setTimeout(() => {
        document.body.classList.remove('game-over');
    }, 200);
    enable("no");
    
}


$(document).on('click','div[type="button"]',function(){
    let btnId = $(this).attr('id');
    if(btnId === game[orderCount]){
        orderCount++;
        pressed(btnId);
        new Audio(sounds[btnId]).play();
         if(orderCount===game.length){
            orderCount = 0;
            enable("yes");  
         }
    } else{
        game.splice(0);
        orderCount = 0;
        level = 0;
        gameOver();
    }   
    
    
    
    
});