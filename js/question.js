import { questionsContainer, setting } from "./index.js";

// questionsContainer;
export class Questions {
  constructor(results) {
    this.results = results;
    this.category = results[0].category;
    this.score = 0;
    console.log(this.results.length);

    this.answer = true;
    this.index = 0;
    this.displayQuestions();
  }
  displayQuestions() {
    // this.mixAnswers(index);
    questionsContainer.innerHTML = ` <div
    class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn">
    <div class="w-100 d-flex justify-content-between">
      <span class="btn btn-category">${this.category}</span>
      <span class="fs-6 btn btn-questions">${this.index + 1} of ${
      this.results.length
    } Questions</span>
    </div>
    <h2 class="text-capitalize h4 text-center">${
      this.results[this.index].question
    }</h2>
    <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
      ${this.mixAnswers(this.index)
        .map((item) => `<li>${item}</li>`)
        .join("")}
    </ul>
    <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score:
      ${this.score} </h2>
    </div> `;
    // const checker = document.querySelectorAll(".choices li");
    $(".choices li").on(
      "click",
      function (e) {
        e.preventDefault();
        // console.log(this);
        this.checkAnswer(e.target);
      }.bind(this)
    );
  }
  // checkAnswer
  checkAnswer(item, index) {
    if (this.answer) {
      console.log("hi there");
      if (item.innerHTML == this.results[this.index].correct_answer) {
        item.classList.add("correct", "animate__animated", "animate__flash");
        this.score += 1;
      } else {
        item.classList.add("wrong", "animate__animated", "animate__shakeX");
      }
      this.answer = false;
    }
    this.animationQuestion(item, 500);
  }
  //   animationQuestion
  animationQuestion(element, duration) {
    setTimeout(() => {
      element
        .closest(".question")
        .classList.replace("animate__bounceIn", "animate__backOutLeft");
    }, duration);
    setTimeout(() => {
      this.nextQuestion();
    }, duration * 2);
  }

  //   nextQuestion()
  nextQuestion() {
    this.index += 1;
    if (this.index < this.results.length) {
      this.answer = true;
      this.displayQuestions();
    } else {
      this.endQuiz();
      //   questionsContainer.innerHTML = quiz.endQuiz();
      //   const againBtn = document.querySelector(".again");
      //   againBtn.addEventListener("click", function () {
      //     location.reload();
      //   });
    }
  }
  //   set answers
  mixAnswers(index) {
    let random = Math.round(
      Math.random() * this.results[index].incorrect_answers.length
    );

    // console.log(this.results[index].incorrect_answers);
    this.results[index].incorrect_answers.splice(
      random,
      0,
      this.results[index].correct_answer
    );
    return this.results[index].incorrect_answers;
  }

  //   end questions
  endQuiz() {
    questionsContainer.innerHTML = `<div
    class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3"
    >
    <h2 class="mb-0">${
      this.score == this.results.length
        ? `congratulations`
        : `your Score is ${this.score}`
    }     
    </h2>
    <button class="again btn btn-primary rounded-pill"><i class="bi bi-arrow-repeat"></i> Try Again</button>
    </div> `;
    document.querySelector(".again").addEventListener("click", function () {
      window.location.reload();
    });
  }
}
