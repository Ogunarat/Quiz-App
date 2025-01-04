const timeElement = document.querySelector(".time");
const countElement = document.querySelector(".count");
const timerElement = document.querySelector(".timer");
const questionElement = document.querySelector(".question");
const optionElement = document.querySelectorAll(".option");
const againElement = document.querySelector(".again");
const resultsElement = document.querySelector(".results");
const correctElement = document.querySelector(".results-correct");
const wrongElement = document.querySelector(".results-wrong");
const emptyElement = document.querySelector(".results-empty");
const container = document.querySelector(".container");

let correctAnswerTotal = 0;
let wrongAnswerTotal = 0;
let emptyAnswerTotal = 0;
let canSelectOption = true;
let questionNumber = 0;
let interval,
  sayac,
  time = 30;

const questions = [
  {
    question: "Dünyanın en büyük dağı hangisidir?",
    options: ["Everest Dağı", " K2", "Annapurna"],
    answer: "Everest Dağı",
  },
  {
    question: "Türkiye'nin başkenti neresidir?",
    options: ["İstanbul", "Ankara", "İzmir"],
    answer: "Ankara",
  },
  {
    question: "Mona Lisa tablosunun ressamı kimdir?",
    options: ["Leonardo Da Vinci", "Picasso", "Vincet Vangoh"],
    answer: "Leonardo Da Vinci",
  },
  {
    question: "İlk insanın Ay'a ayak basma tarihi nedir?",
    options: ["1969", "1975", "1983"],
    answer: "1969",
  },
  {
    question: "Hangi gezegen Güneş sistemindeki en büyük gezegendir?",
    options: ["Mars", "Jüpiter", "Venüs"],
    answer: "Jüpiter",
  },
  {
    question: "Hangi ünlü bilim adamı yerçekimini keşfetmiştir?",
    options: ["Isaac Newton", "Albert Einstain", "Galileo Galilei"],
    answer: "Isaac Newton",
  },
  {
    question: "'İki Şehrin Hikayesi' adlı eserin yazarı kimdir?",
    options: ["Leo Tolstoy", "Jane Austen", "Charles Dickens"],
    answer: "Charles Dickens",
  },
  {
    question:
      "Hangi gezegenin uydusu Europa'da su bulunduğunu düşünülmektedir?",
    options: ["Mars", "Jüpiter", "Satürn"],
    answer: "Jüpiter",
  },
  {
    question: "'La Guernica' tablosunun ressamı kimdir?",
    options: ["Salvador Dali", "Pablo Picasso", "Vincet Vangoh"],
    answer: "Pablo Picasso",
  },
  {
    question: "Hangi ülkenin bayrağında ay ve yıldız bulunmaktadır?",
    options: ["İtalya", "Kanada", "Türkiye"],
    answer: "Türkiye",
  },
];

optionElement.forEach((option) => {
  option.addEventListener("click", () => {
    if (!canSelectOption) {
      return;
    }
    const selectedOption = option.textContent;
    const correctOption = questions[questionNumber].answer;

    optionElement.forEach((e) => {
      if (e.textContent === selectedOption) {
        if (selectedOption === correctOption) {
          e.style.backgroundColor = "#739072";
          correctAnswerTotal++;
        } else {
          e.style.backgroundColor = "#AF2655";
          wrongAnswerTotal++;
        }
      } else {
        e.style.backgroundColor = "transparent";
      }
    });

    canSelectOption = false;
    setTimeout(() => {
      canSelectOption = true;
      nextQuestion();
    }, 1500);
  });
});
start();
function start() {
  startTimerLine();
  clearInterval(sayac);
  container.style.opacity = 1;
  container.style.pointerEvents = "all";
  resultsElement.style.display = "none";
  time = 30;
  timeElement.textContent = time + "sn";
  timeControl();
  countElement.textContent = `${questionNumber + 1}/${questions.length}`;
  optionElement.forEach((option, index) => {
    option.style.backgroundColor = "transparent";
    option.textContent = questions[questionNumber].options[index];
  });
  questionElement.textContent = questions[questionNumber].question;
}
function end() {
  clearInterval(sayac);
  clearInterval(interval);
  container.style.opacity = 0.5;
  container.style.pointerEvents = "none";
  resultsElement.style.display = "block";
  correctElement.textContent = `Doğru : ${correctAnswerTotal}`;
  wrongElement.textContent = `Yanlış : ${wrongAnswerTotal}`;
  emptyElement.textContent = `Boş : ${emptyAnswerTotal}`;
}

function nextQuestion() {
  if (questionNumber < questions.length - 1) {
    questionNumber++;
  } else {
    end();
    return;
  }
  start();
}

function startTimerLine() {
  timerElement.style.width = "0px";
  clearInterval(interval);

  const targetWidth = 560;
  const totalTime = 30000;
  let currentTime = totalTime;

  interval = setInterval(() => {
    currentTime -= 10;
    if (currentTime >= 0) {
      const progres = (totalTime - currentTime) / totalTime;
      const currentWidth = progres * targetWidth;
      timerElement.style.width = `${currentWidth}px`;
    } else {
      clearInterval(interval);
    }
  }, 10);
}
function timeControl() {
  sayac = setInterval(() => {
    if (time > 0) {
      time -= 1;
      timeElement.textContent = time + "sn";
    } else {
      emptyAnswerTotal++;
      nextQuestion();
    }
  }, 1000);
}
againElement.addEventListener("click", () => {
  window.location.reload();
});
