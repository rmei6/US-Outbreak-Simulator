// import Papa from 'papaparse';
class Flight{
    constructor(){
        this.data = this.getFlights();
    }

    async getAirport(id){       //need server setup
        const response = await fetch('https://api.aviationapi.com/v1/airports?apt='+ id);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    }

    async getFlights(){
        const travels = {};
        let airports = {};
        // const response = fetch('../../flights.csv')
        //     .then(response => response.text())
        //     .then(v => Papa.parse(v))
        //     .catch(err => console.log(err))

        // console.log(response)


        await d3.csv("../../flights.csv", function(data){
                // let travel = [data[i].MONTH, data[i].DAY];
                // if (!airports[data[i].ORIGIN_AIRPORT]){
                //     airports[data[i].ORIGIN_AIRPORT] = getAirport(data[i].ORIGIN_AIRPORT).state_full;
                // }
                // if(!travels[[data.MONTH,data.DAY]]){
                //     travels[[data.MONTH,data.DAY]] = [];
                //     travels[[data.MONTH,data.DAY]].push([data.ORIGIN_AIRPORT,data.DESTINATION_AIRPORT]);
                //     console.log([data.MONTH,data.DAY]);
                // }else{
                //     travels[[data.MONTH,data.DAY]].push([data.ORIGIN_AIRPORT,data.DESTINATION_AIRPORT]);
                // }
                if(!airports[data.ORIGIN_AIRPORT]){
                    console.log(data.ORIGIN_AIRPORT);
                    airports[data.ORIGIN_AIRPORT] = 10;
                }
                if(!airports[data.DESTINATION_AIRPORT]){
                    console.log(data.DESTINATION_AIRPORT);
                    airports[data.DESTINATION_AIRPORT] = 10;
                }
                // if (data.FLIGHT_NUMBER === '100') {
                    // console.log(data);
                // }

                // console.log(data.YEAR);
                // console.log(data.ORIGIN_AIRPORT);
                // console.log(data.DESTINATION_AIRPORT);
            // }
        })
        console.log(Object.keys(airports));
        return travels;
    }
}

export default Flight;