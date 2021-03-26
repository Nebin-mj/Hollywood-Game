//selectors
const container = document.getElementById("container");
const dynamic = document.getElementById("dynamic");
const hollywood = document.getElementById("hollywood");
const enter = document.getElementById("enter"); //enter is the form input Field
const guess = document.getElementById("guess");
const button = document.getElementById("button");
const startBtn = document.getElementById("start");
const form = document.getElementById("form");
const resetBtn = document.getElementById("reset");

//random assignments
let containsUnderscore = false;
let modQnPlain = "";
const strikeStart = "<s style='color:red'>";
const strikeEnd = "</s>";
let holly = "HOLLYWOOD";
hollywood.innerHTML = holly;
let count = 9;
let names = [
  "mission impossible",
  "wanda vision",
  "avengers",
  "falcon and the winter soilder",
  "dr strange",
  "thor the dark world",
  "thor ragnarock",
  "ant man",
  "captian america the first avenger",
  "iron man",
  "captaian america the winter soildier",
  "captaian america civil war",
];
let qn;
let modQn;

//eventListeners
button.addEventListener("click", fun);
startBtn.addEventListener("click", fun2);
resetBtn.addEventListener("click", fun3);

//functions
function fun() {
  if (enter.value != "") {
    play();
  }
}

function fun2() {
  startBtn.className = "hidden";
  guess.className = "";
  form.className = "form";
  qn = names[Math.floor(Math.random() * names.length)];
  modQn = makeQn(qn);
  guess.innerHTML = displayQn(modQn);
}

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

function play() {
  guess.innerHTML = displayQn(modQn);
  if (qn == enter.value) {
    guess.innerHTML = "!!YOU GUESSED IT!!<br>The movie is " + qn.toUpperCase();
    form.className = "hidden";
    resetBtn.className = "reset";
  } else if (qn.includes(enter.value)) {
    modQn = modifyQn(qn, modQn, enter.value);
    let i;
    if (modQn.includes("_")) {
      containsUnderscore = true;
      modQnPlain = modQn;
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

function makeQn(qna) {
  let newQn = "";
  for (i = 0; i < qna.length; i++) {
    newQn = newQn.concat("_");
  }
  return newQn;
}

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
