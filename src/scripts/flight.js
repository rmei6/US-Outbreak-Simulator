import DataFetcher from "./data_fetcher";
class Flight{
    constructor(){
        this.airport_states = this.getAirportStates();
        // this.flights = this.getFlights();
        // this.set_state = this.set_state.bind(this);
    }

    async set_state(airport) {
        await DataFetcher.getAirport(airport).then(response => {
            return response.state_full.split(" ").join("_");
        })
        .catch(error => {
            return "nowhere";
        });
    }
    
    async getFlights() {
        const travels = {};
        let airport_states = {};
        console.log("hi");
        // await DataFetcher.getAirport('KFDW').then(response => {
        //             airport_states['KFDW'] = response.state_full.split(" ").join("_");
        //         });
        await d3.csv("./assets/flights.csv", function(data){
            // if (!airport_states[data.ORIGIN_AIRPORT]){
                // debugger;
            // airport_states[data.ORIGIN_AIRPORT] ||= set_state(data.ORIGIN_AIRPORT);
            // airport_states[data.DESTINATION_AIRPORT] ||= set_state(data.DESTINATION_AIRPORT);
            // }
            // if (!airport_states[data.DESTINATION_AIRPORT]){
            //     // debugger;
            //     await DataFetcher.getAirport(data.DESTINATION_AIRPORT).then(response => {
            //         airport_states[data.DESTINATION_AIRPORT] = response.state_full.split(" ").join("_");
            //     })
            //     .catch(error => {
            //         airport_states[data.DESTINATION_AIRPORT] = "nowhere";
            //     });
            // }
            // if (!airports[data.DESTINATION_AIRPORT]){
            //     let port = Flight.getAirport(data.DESTINATION_AIRPORT);
            //     airports[data.DESTINATION_AIRPORT] = port ? port.state_full : "nowhere";
            // }
            // if(!travels[[data.MONTH,data.DAY]]){
            //     travels[[data.MONTH,data.DAY]] = [];
            //     travels[[data.MONTH,data.DAY]].push([airport_states[data.ORIGIN_AIRPORT],airport_states[data.DESTINATION_AIRPORT]]);
            //     // console.log([data.MONTH,data.DAY]);
            // }else{
            //     travels[[data.MONTH,data.DAY]].push([airport_states[data.ORIGIN_AIRPORT],airport_states[data.DESTINATION_AIRPORT]]);
            // }
            if(!travels[[data.MONTH,data.DAY]]){
                travels[[data.MONTH,data.DAY]] = [];
                travels[[data.MONTH,data.DAY]].push([data.ORIGIN_AIRPORT,data.DESTINATION_AIRPORT]);
                console.log([data.MONTH,data.DAY]);
            }else{
                travels[[data.MONTH,data.DAY]].push([data.ORIGIN_AIRPORT,data.DESTINATION_AIRPORT]);
            }
            // if(!airports[data.ORIGIN_AIRPORT]){
            //     console.log(data.ORIGIN_AIRPORT);
            //     airports[data.ORIGIN_AIRPORT] = 10;
            // }
            // if(!airports[data.DESTINATION_AIRPORT]){
            //     console.log(data.DESTINATION_AIRPORT);
            //     airports[data.DESTINATION_AIRPORT] = 10;
            // }
            // if (data.FLIGHT_NUMBER === '100') {
                // console.log(data);
            // }
        })
        // console.log(airport_states);
        // console.log(!!airport_states['KFDW']);
        return travels;
    }

    async getAirportStates(){
        var airport_states = {};
        var airports = [];
        await d3.csv("./assets/flights.csv", function(data){
            airports.push(data.ORIGIN_AIRPORT);
            airports.push(data.DESTINATION_AIRPORT);
        })
        var uniqAirports = [...new Set(airports)].sort();
        // let len = Math.floor(uniqAirports.length/2)
        var part1 = uniqAirports.slice(0,60);   //api only allows 60 fetches per minute
        var part2 = uniqAirports.slice(60);
        console.log(uniqAirports);
        let i = 0;
        part1.forEach(function(port){
            DataFetcher.getAirport(port).then(response => {
                airport_states[port] = response.state_full.split(" ").join("_");
            })
            .catch(error => {
                // console.log(error);
                airport_states[port] = "nowhere";
            });
        })

        part2.forEach(function(port){
            DataFetcher.getAirport(port).then(response => {
                airport_states[port] = response.state_full.split(" ").join("_");
            })
            .catch(error => {
                // console.log(error);
                airport_states[port] = "nowhere";
            });
        })
        return airport_states;
    }
}

export default Flight;