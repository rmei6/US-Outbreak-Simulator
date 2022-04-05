import DataFetcher from "./data_fetcher";
class Flights{
    constructor(){
        // this.airport_states = {};
        this.airport_states = {};
        this.travels = [];
        let that = this;
        // this.getFlights = this.getFlights.bind(this);
        setTimeout(function(){
            that.travels = that.getFlights();
            // this.travels = this.getFlights();
        },70000)
        this.getAirportStates();
        // this.getAirportStates = this.getAirportStates.bind(this);
        // this.getAirportStates.call(this);

        // this.flights = this.getFlights();
        // this.set_state = this.set_state.bind(this);
    }

    set_state(port) {
        DataFetcher.getAirport(port).then(response => {
            that.airport_states[port] = response.state_full.split(" ").join("_");
        })
        .catch(error => {
            console.log(error);
            that.airport_states[port] = "nowhere";
        });
    }
    
    getFlights() {
        const travels = {};
        let that = this;
        d3.csv("./assets/flights.csv", function(data){
            if(!travels[[data.MONTH,data.DAY]]){
                travels[[data.MONTH,data.DAY]] = [];
                console.log([data.MONTH,data.DAY]);
            }
            travels[[data.MONTH,data.DAY]].push([that.airport_states[data.ORIGIN_AIRPORT],that.airport_states[data.DESTINATION_AIRPORT]]);
        })
        console.log(travels);
        // debugger;
        return travels;
    }

    async getAirportStates(){   //will need to dynamically split it into arrays of 60 if switching files
        var airports = [];
        await d3.csv("./assets/flights.csv", function(data){
            airports.push(data.ORIGIN_AIRPORT);
            airports.push(data.DESTINATION_AIRPORT);
        })
        var uniqAirports = [...new Set(airports)].sort();
        var part1 = uniqAirports.slice(0,60);   //api only allows 60 fetches per minute
        var part2 = uniqAirports.slice(60);
        let that = this;
        setTimeout(function(){
            console.log('part2');
            part2.forEach(function(port){
                DataFetcher.getAirport(port).then(response => {
                    that.airport_states[port] = response.state_full.split(" ").join("_");
                })
                .catch(error => {
                    console.log(error);
                    that.airport_states[port] = "nowhere";
                });
            })
            // console.log(that.airport_states);
        },65000)
        console.log('part1');
        part1.forEach(function(port){
            DataFetcher.getAirport(port).then(response => {
                that.airport_states[port] = response.state_full.split(" ").join("_");
            })
            .catch(error => {
                console.log(error);
                that.airport_states[port] = "nowhere";
            });
        })
    }
}

export default Flights;