import Flights from "./scripts/flights";
import DataFetcher from "./scripts/data_fetcher";
import View from "./scripts/view";
import Simulation from "./scripts/simulation";

document.addEventListener("DOMContentLoaded", () => {
  let air = new Flights();
  var form1 = document.getElementById('sim-info');
  var form2 = document.getElementById('state-info');
  var button1 = document.getElementById('start');
  var button2 = document.getElementById('reset');
  form1.style.display = 'none';
  form2.style.display = 'none';
  button1.style.display = 'none';
  button2.style.display = 'none';
  var load = document.getElementById('loading_bar');
  load.style.display = 'block';
  load.innerHTML = "Please wait for 80 seconds and Please don't reload more than once every 2 minutes. This is due to API request limitations";
  //load loading bar (load.js) if possible
  setTimeout(function(){
    load.style.display = 'none';
    form1.style.display = 'block';
    form2.style.display = 'block';
    button1.style.display = 'block';
    button2.style.display = 'block';
    console.log(air.travels);     //air.travels empty until 
    let data = air.travels;
    // console.log(air.travels[[1,1]]);
    let view = new View(air.travels,document);
    debugger;
  },75000)    //need time for csv file read
})


