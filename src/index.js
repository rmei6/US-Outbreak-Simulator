import Example from "./scripts/example"

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("main")
    new Example(main)
})

async function getAirport(id){
    const response = await fetch('https://api.aviationapi.com/v1/airports?'+ id);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

const flights = [];
let airports = {};
d3.csv('../flights.csv', function(data){
    let limit = Math.floor(data.length / 4);    //3 months
    for (let i=0;i<limit;i++){
        let travel = [data[i].MONTH, data[i].DAY];
        if (!airports[data[i].ORIGIN_AIRPORT]){
            airports[data[i].ORIGIN_AIRPORT] = getAirport(data[i].ORIGIN_AIRPORT).state_full;
        }
    }
})



