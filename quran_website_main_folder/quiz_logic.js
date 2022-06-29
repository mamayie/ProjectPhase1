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

    const ayahNumber = Math.floor(Math.random() * surahs[rand].ayahs.length);
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
