class Flight{
    constructor(){
        // this.getAirport = this.getAirport.bind(this);
        this.data = this.getFlights();
    }

    static async getAirport(id) {       //need server setup,maybe not. github pages says it doesn't
        console.log('https://api.aviationapi.com/v1/airports?apt='+ id);
        // debugger;
        const response = await fetch('https://api.aviationapi.com/v1/airports?apt='+ id);
        if (!response.ok) {
            // throw new Error('Network response was not ok');
            return null;
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    
    async getFlights() {
        const travels = {};
        let airports = {};
        await d3.csv("../../flights.csv", function(data){
            // if (!airports[data.ORIGIN_AIRPORT]){
            //     // debugger;
            //     Flight.getAirport(data.ORIGIN_AIRPORT).then(response => {
            //         airports[data.ORIGIN_AIRPORT] = response.state_full;
            //     })
            //     .catch(error => {
            //         airports[data.ORIGIN_AIRPORT] = "nowhere";
            //     });
            // }
            // if (!airports[data.DESTINATION_AIRPORT]){
            //     // debugger;
            //     Flight.getAirport(data.DESTINATION_AIRPORT).then(response => {
            //         airports[data.DESTINATION_AIRPORT] = response.state_full;
            //     })
            //     .catch(error => {
            //         airports[data.DESTINATION_AIRPORT] = "nowhere";
            //     });
            // }
            // if (!airports[data.DESTINATION_AIRPORT]){
            //     let port = Flight.getAirport(data.DESTINATION_AIRPORT);
            //     airports[data.DESTINATION_AIRPORT] = port ? port.state_full : "nowhere";
            // }
            // if(!travels[[data.MONTH,data.DAY]]){
            //     travels[[data.MONTH,data.DAY]] = [];
            //     travels[[data.MONTH,data.DAY]].push([data.ORIGIN_AIRPORT,data.DESTINATION_AIRPORT]);
            //     console.log([data.MONTH,data.DAY]);
            // }else{
            //     travels[[data.MONTH,data.DAY]].push([data.ORIGIN_AIRPORT,data.DESTINATION_AIRPORT]);
            // }
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
        console.log(airports);
        return travels;
    }
}

export default Flight;