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
  