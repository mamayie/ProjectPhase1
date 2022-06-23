(function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw ((a.code = "MODULE_NOT_FOUND"), a);
          }
          var p = (n[i] = { exports: {} });
          e[i][0].call(
            p.exports,
            function (r) {
              var n = e[i][1][r];
              return o(n || r);
            },
            p,
            p.exports,
            r,
            e,
            n,
            t
          );
        }
        return n[i].exports;
      }
      for (
        var u = "function" == typeof require && require, i = 0;
        i < t.length;
        i++
      )
        o(t[i]);
      return o;
    }
    return r;
  })()(
    {
      1: [
        function (require, module, exports) {
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
              const selectedAnser = document.querySelector(
                'input[type="radio"]:checked'
              );
              const selectedAnserJson = JSON.parse(selectedAnser.value);
              const isCorrect = quizObjec.verify(
                question,
                selectedAnserJson,
                surahs
              );
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
        },
        { "./quiz_logic.js": 2, "./quran_api.js": 3 },
      ],
      2: [
        function (require, module, exports) {
          // quran api
  
          //  this class handles all the logics
          class quiz {
            constructor(quran) {
              this._quran = quran;
            }
  
            listOfSurahs() {
              const rand = Math.floor(Math.random() * 112);
              return this._quran.surahs.slice(rand, rand + 3);
            }
  
            selectAyah(surahs) {
              const rand = Math.floor(Math.random() * 3);
  
              const ayahNumber = Math.floor(
                Math.random() * surahs[rand].ayahs.length
              );
              return surahs[rand].ayahs[ayahNumber];
            }
  
            verify(question, selectedSurah, surahs) {
              let isFound = false;
              for (const surah of surahs) {
                if (surah.ayahs.includes(question)) {
                  // for future codes
                } else {
                  // for future codes
                }
              }
  
              for (const ayah of selectedSurah.ayahs) {
                if (ayah.text == question.text) {
                  isFound = true;
                  break;
                } else {
                }
              }
  
              return isFound;
            }
          }
  
          module.exports.quizClass = quiz;
          console.log(module);
        },
        {},
      ],
      3: [
        function (require, module, exports) {
          async function getQuran() {
            let quran;
            const url = "http://api.alquran.cloud/v1/quran/quran-uthmani";
            const response = await fetch(url, {
              cache: "force-cache",
            });
  
            if (response.ok) {
              let jsonResponse = await response.json();
              quran = jsonResponse.data;
            }
  
            return quran;
          }
  
          module.exports.getQuran = getQuran;
        },
        {},
      ],
    },
    {},
    [1]
  );
  