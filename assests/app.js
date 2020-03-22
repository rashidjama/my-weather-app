//api url
const urlBase = "https:/api.openweathermap.org/data/2.5/weather?q="

//api key
const apiKey = "&appid=ddcda21a40302eb72786fa7fcaeec045";

//create dynamic date with js
let currentDate = new Date();
const newDate = `${currentDate.getMonth()+1}/ ${currentDate.getDate()}/${currentDate.getFullYear()}`

//catch the dom
const btnEl = document.getElementById("check");
const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const dateEl = document.getElementById("date");
const feelingEl = document.getElementById("feeling");
const moodEl = document.querySelector(".mood");
console.log(moodEl)

//get data from api
const getData = async url => {
  const data = await fetch(url);
  const result = await data.json();
  return result;
}

//post data 
const postData = async (url, myData) => {
  const data = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(myData)
  });
  const result = await data.json();
  return result;
}

//UPDATE UI HELPER FUNCTION
const updateUI = aData => {
  tempEl.innerHTML = `<div class="alert alert-primary roll="alert">Today's temperature is: ${aData.temp} F</div>`
  dateEl.innerHTML = `<div class="alert alert-primary roll="alert">Today's date is: ${aData.date}.</div>`;
  moodEl.innerHTML = `<div class="alert alert-primary roll="alert"> I am feeling, ${aData.feeling} today!</div>`
}

//main
btnEl.addEventListener("click", async () => {
  
  //city entry value
  let cityVal = cityEl.value;
  if(!cityVal) {
    cityVal = "seattle";
  }
  //feeling entry value
  let feelVal = feelingEl.value || "Good";

  
  //get data from API
  const respFromAPI = await getData(urlBase + cityVal + apiKey);
  console.log("response from API: ", respFromAPI)
  //form an object and send it to server
  let kTemp = Math.floor(respFromAPI.main.temp);
  let fTemp = Math.floor((kTemp-273.15) * 9/5 + 32);
  let obj = {

    temperature: fTemp,
    date: newDate,
    feeling: feelVal
  }
  console.log(obj)
  //send obj to server and get response from server
  const respFromServer = await postData("/postData", obj);
  console.log("respnse from server: ", respFromServer)
  
  //recieve data from server
  const respFromGet = await getData("/getData");
  console.log("data from server: ", respFromGet)
  //update UI
  updateUI(respFromGet)
});
