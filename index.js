let gameSeq = [];
let userSeq = [];
let highestScore = 0 ;

let btns = [ "red","yellow","green","purple"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
document.addEventListener("keypress", () => {
  if (started == false) {
    console.log("Game is started");
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  console.log(btn.classList);
  btn.classList.add("flash");
  console.log(btn.classList);
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 100);
}
function userFlash(btn) {
  btn.classList.add("userflash");
 
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  //rendom btn flash
  let randIdx = Math.floor(Math.random()*3) ;
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  btnFlash(randBtn);
  
  
}
function checkAns(idx){
  console.log(gameSeq);
  if(userSeq[idx] === gameSeq[idx]){
    console.log("same");
    if(userSeq.length == gameSeq.length){
      setTimeout(levelUp , 1000);
      
    }
  }
  else{
    
    h2.innerHTML = `Game Over! Your Score is <b>${level}</b> <br/> Previous Highest Score was <b>${highestScore}</b> <br/> Press any key to restart`;
    let body = document.querySelector("body");
    body.style.backgroundColor = "red";
    setTimeout(()=>{
      body.style.backgroundColor = "white"
    }, 250);
    highestScore = Math.max(highestScore, level);
    reset();
  }
}

function btnPress(){
  console.log(this);
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  console.log(userColor);
  userSeq.push(userColor);

  checkAns(userSeq.length-1);

}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
  btn.addEventListener("click", btnPress);
}

function reset(){
  started = false;
  gameSeq = [];
  userSeq = [];
  
  level = 0;
}