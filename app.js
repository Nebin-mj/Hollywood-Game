//selectors
const container = document.getElementById("container"); //div holding all the elements
const dynamic = document.getElementById("dynamic"); //div containing hollywood and guess
const hollywood = document.getElementById("hollywood"); //h1 tag where HOLLYWOOD is displayed
const guess = document.getElementById("guess"); //field where name to be guessd is displayed
const form = document.getElementById("form"); //contains !!sure!! button and input field
const startBtn = document.getElementById("start"); //start button
const enter = document.getElementById("enter"); //enter is the form input Field
const button = document.getElementById("button"); //!!sure!! button
const resetBtn = document.getElementById("reset"); //reset button

//initial assignments
let containsUnderscore = false;
let modQnPlain = "";
const strikeStart = "<s style='color:red'>";
const strikeEnd = "</s>";
let holly = "HOLLYWOOD";
hollywood.innerHTML = holly;
let count = 9;
let names = [
  "mission impossible",
  "avengers",
  "dr strange",
  "thor the dark world",
  "thor ragnarok",
  "ant man",
  "captain america the first avenger",
  "iron man",
  "captain america the winter soldier",
  "captain america civil war",
];
let qn;
let modQn;

//eventListeners
button.addEventListener("click", fun);
startBtn.addEventListener("click", fun2);
resetBtn.addEventListener("click", fun3);

//functions

//event listener for button
function fun() {
  if (enter.value != "") {
    play();
  }
}

//event listener for startBtn
function fun2() {
  startBtn.className = "hidden";
  guess.className = "";
  form.className = "form";
  qn = names[Math.floor(Math.random() * names.length)];
  modQn = makeQn(qn);
  guess.innerHTML = displayQn(modQn);
}

//event listener for resetBtn
function fun3() {
  resetBtn.className = "hidden";
  form.className = "form";
  holly = "HOLLYWOOD";
  count = 9;
  hollywood.innerHTML = holly;
  qn = names[Math.floor(Math.random() * names.length)];
  modQn = makeQn(qn);
  guess.innerHTML = displayQn(modQn);
}

//function fun() invokes this function and checks if entered letter is in the name to be guessed or
//if entered name is same as the name to be guessed or not and perform appropriate operation
function play() {
  guess.innerHTML = displayQn(modQn);
  if (qn == enter.value.toLowerCase()) {
    guess.innerHTML = "!!YOU GUESSED IT!!<br>The movie is " + qn.toUpperCase();
    form.className = "hidden";
    resetBtn.className = "reset";
  } else if (qn.includes(enter.value.toLowerCase())) {
    modQn = modifyQn(qn, modQn, enter.value.toLowerCase());
    let i;
    modQnPlain = modQn;
    if (modQn.includes("_")) {
      containsUnderscore = true;
      i = 0;
      while (1) {
        if (modQnPlain.substr(i).includes("_")) {
          modQnPlain = modQnPlain.replace("_", " ");
        } else {
          break;
        }
        i++;
      }
    }
    if (modQnPlain == qn) {
      guess.innerHTML =
        "!!YOU GUESSED IT!!<br>The movie is " + qn.toUpperCase();
      form.className = "hidden";
      resetBtn.className = "reset";
    } else {
      guess.innerHTML = displayQn(modQn);
    }
  } else {
    count -= 1;
    hollywood.innerHTML =
      strikeStart +
      holly.substr(0, 9 - count) +
      strikeEnd +
      holly.substr(9 - count, holly.length);
    if (count == 0) {
      guess.innerHTML =
        "!!OPPS!! YOUR CHANCE IS OVER!!<br>THE MOVIE IS " + qn.toUpperCase();
      form.className = "hidden";
      resetBtn.className = "reset";
    }
  }
  enter.value = "";
}

//recives a string and returns a string whose every character is replaced by '_'
function makeQn(qna) {
  let newQn = "";
  for (i = 0; i < qna.length; i++) {
    newQn = newQn.concat("_");
  }
  return newQn;
}

//function which replaces '_' of modiQn in all the positons where qna contains val
function modifyQn(qna, modiQn, val) {
  if (qna.includes(val)) {
    for (i = 0; i < qna.length; i++) {
      if (qna[i] == val) {
        modiQn =
          modiQn.substr(0, i) + val + modiQn.substr(i + 1, modiQn.length);
      }
    }
  }
  return modiQn;
}

//returns a string which contains every character of the recived string saperated by a space(' ')
function displayQn(qna) {
  let retQna = "";
  for (i = 0; i < qna.length; i++) {
    retQna += qna[i];
    if (i < qna.length - 1) {
      retQna += " ";
    }
  }
  return retQna;
}
