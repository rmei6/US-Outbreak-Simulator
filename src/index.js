import { async } from "regenerator-runtime";
import Flight from "./scripts/flight";
import DataFetcher from "./scripts/data_fetcher";

document.addEventListener("DOMContentLoaded", () => {
    // DataFetcher.getAirport("KDFW");
    let air = new Flight();
    console.log(air.airport_states);
    // DataFetcher.getAirport('MDT');
    // console.log("hi");
    // corsRequest();
    // apiRequest();
})

// new Flight();

//airports has a CORS so need a server
//making server essentially makes a new local host
// fetch("https://api.aviationapi.com/v1/airports?apt=KDFW")
// .then((res) => {return res.json();})
// .then((data) => {console.log(data)})

