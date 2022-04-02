import Flight from "./scripts/flight"

document.addEventListener("DOMContentLoaded", () => {
    let air = new Flight();
    // console.log(air.data);
    // console.log("hi");
})

// new Flight();

//airports has a CORS so need a server
//making server essentially makes a new local host
// fetch("https://api.aviationapi.com/v1/airports?apt=KDFW")
// .then((res) => {return res.json();})
// .then((data) => {console.log(data)})

