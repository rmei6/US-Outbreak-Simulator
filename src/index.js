import Flights from "./scripts/flights";
import DataFetcher from "./scripts/data_fetcher";
import View from "./scripts/view";
import Simulation from "./scripts/simulation";

document.addEventListener("DOMContentLoaded", () => {
  let air = new Flights();
  var main = document.getElementById('main-content');
  main.style.display = 'none';
  var load = document.getElementById('loading_bar');
  load.style.display = 'block';
  var warning = document.getElementById('warning');
  warning.innerHTML = "Please wait for 90 seconds and Please don't reload more than once every 2 minutes. This is due to slow Heroku CSV read times";
  var pause = document.getElementById('pause');
  var unpause = document.getElementById('unpause');
  pause.style.display = 'none';
  unpause.style.display = 'none';
  //load loading bar (load.js) if possible
  setTimeout(function(){
    load.style.display = 'none';
    main.style.display = 'block';
    // console.log(air.travels);
    let data = air.travels;
    // console.log(data);
    let view = new View(data,document);
    // debugger;
  },1500)//80000)    //need time for csv file read
})


