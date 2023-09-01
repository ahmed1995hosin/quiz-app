import { Questions } from "./question.js";
import { SettingQuiz } from "./setting.js";

// SettingQuiz;

// console.log(setting);

// selecting elements
const startQuiz = document.getElementById("startQuiz");
const catagoryElement = document.getElementById("categoryMenu");
const difficultyElement = document.querySelectorAll(".difficultyOptions");
const questionsNumber = document.getElementById("questionsNumber");
// console.log(questionsNumber, catagoryElement, difficultyElement);
export let questionsContainer = document.querySelector(".questions-container");
export let responseResults;
export let setting;
// console.log(difficultyElement);
// start quiz
startQuiz.addEventListener("click", async () => {
  console.log("Quiz started");

  // to know which difficulty is selected
  let difficulty = [...difficultyElement];
  difficulty = difficulty.find((difficult) => difficult.checked);
  //
  setting = new SettingQuiz(
    catagoryElement.value,
    difficulty.value,
    questionsNumber.value
  );
  responseResults = await setting.getResponse();
  console.log(responseResults.results);
  document.getElementById("quizForm").classList.replace("d-flex", "d-none");
  let Question = new Questions(responseResults.results);
});
