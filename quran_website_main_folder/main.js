const quizApi = require("./quiz_logic.js");
const quranApi = require("./quran_api.js");

document.getElementById("next").onclick = (event) => {
  controller();
};

async function controller() {
  const radioButtons = document.querySelectorAll("input[type='radio']");
  const infoBox = document.getElementById("info");

  const radioLabels = document.getElementsByClassName("option");

  const quran = await quranApi.getQuran();
  const quizObjec = new quizApi.quizClass(quran);
  const surahs = quizObjec.listOfSurahs();
  const question = quizObjec.selectAyah(surahs);
  document.getElementById("clap").style.display = "none";

  document.getElementById("question").innerText = question.text;
  for (let i = 0; i < 3; i++) {
    radioLabels[i].innerText = surahs[i].name;
    const surahString = JSON.stringify(surahs[i]);
    radioButtons[i].value = surahString;
  }

  document.getElementById("submit").onclick = (event) => {
    const selectedAnser = document.querySelector('input[type="radio"]:checked');
    const selectedAnserJson = JSON.parse(selectedAnser.value);
    const isCorrect = quizObjec.verify(question, selectedAnserJson, surahs);
    if (isCorrect == true) {
      infoBox.innerText = "correct, hooray";
      document.getElementById("clap").style.display = "block";
    } else {
      infoBox.innerText = "try Again!!!";
      document.getElementById("clap").style.display = "none";
    }
  };
}

controller();
