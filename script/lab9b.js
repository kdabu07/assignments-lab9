"use strict";

let timer;
let btnArray = [];
let counter = document.getElementById("count");
let count;
let guesses = [];
let clicks = 0;


function randomGen(min, max){
    return Math.floor(Math.random()* (max - min + 1)) + min;
}

function randomColor(){
    let hex = "0123456789ABCDEF"
    let color = "#"
    for (let x = 0; x < 6; x++){
        color += hex[randomGen(0,15)];
    }
    return color;
}

function Button(top, left, order){
    this.btn = document.createElement("BUTTON");
    this.btn.style.backgroundColor = randomColor(); 
    this.btn.style.width = "10em";
    this.btn.style.height = "5em";
    this.btn.style.position = "";
    this.order = order;
    document.body.appendChild(this.btn);
    this.move = function(top, left){
        this.btn.style.top = top + 'px';
        this.btn.style.left = left + 'px';
    }
    this.move(top, left);
    this.btn.onclick = function (){
        guesses.push(order);
        if(guesses[clicks] != btnArray[clicks].order){
            alert("Incorrect refresh to try again!")
            for(let d = 0; d < btnArray.length; d++){
                btnArray[d].btn.style.display = "none"
            }
        }else{
            if(clicks != btnArray.length - 1){
                alert("Correct! " + (btnArray.length - 1 - clicks) + " to go");
            }
            clicks++;
            if(clicks == btnArray.length){
                alert("Correct! Excellent Memory, refresh to play again!");
                for(let d = 0; d < btnArray.length; d++){
                    btnArray[d].btn.style.display = "none"
                }
            }
        }
    };
}

function moveLocation(a) {
    setTimeout(function() {
        btnArray[a].move(randomGen(0, window.innerHeight - 70), randomGen(0, window.innerWidth - 133));
        btnArray[a].btn.style.position = "absolute";
        clearInterval(timer);
        counter.style.display = "none";
    }, 1000 * count);
}

function clicker(){
    let a = document.getElementById("val").value;
    count = a;
    let h, w;
    if (a >= 5 && a <= 100){
        for(let b = 0; b < a; b++){
            btnArray.push(new Button(randomGen(0, window.innerHeight - 70),
            randomGen(0, window.innerWidth - 133), b));
            moveLocation(b);
        }
        let hidden = document.getElementsByClassName("hide");
    
        for(let x = 0; x < hidden.length; x++){
            hidden[x].style.display = "none";
        }
        counter.innerHTML = "Memorize The pattern! Time: " + count;
        count--;
        timer = setInterval(function(){
            counter.innerHTML = "Memorize The pattern! Time: " + count;
            count--;
        }, 1000);
    } else {
        alert("Please input a number between 5 and 100 inclusive");
    }
}

