import { questionsContainer, responseResults } from "./index.js";

// class settings quiz

export class SettingQuiz {
  constructor(catagory, difficulty, questionsNum) {
    this.catagory = catagory;
    this.difficulty = difficulty;
    this.questionsNum = questionsNum;
    this.score = 0;
    // console.log(this.catagory, this.difficulty, this.questionsNum);
  }

  getResponse() {
    let response = fetch(
      `https://opentdb.com/api.php?amount=${this.questionsNum}&category=${this.catagory}&difficulty=${this.difficulty}`
    )
      .then((respons) => respons.json())
      .then((respon) => respon);
    return response;
    // console.log(response);
    // console.log("response: ");
  }
}
