import DataFetcher from "./data_fetcher";
class Flights{
    constructor(){
        // this.airport_states = {};
        this.airport_states = {
            'ABQ': 'NEW_MEXICO','ALB': 'NEW_YORK','ANC': 'ALASKA','ATL': 'GEORGIA','AUS': 'TEXAS','BDL': 'CONNECTICUT','BHM': 'ALABAMA',
            'BNA': 'TENNESSEE','BOI': 'IDAHO','BOS': 'MASSACHUSETTS','BUF': 'NEW_YORK','BWI': 'MARYLAND','CHS': 'SOUTH_CAROLINA',
            'CLE': 'OHIO','CLT': 'NORTH_CAROLINA','CMH': 'OHIO','COS': 'COLORADO','DAY': 'OHIO','DCA': 'DIST._OF_COLUMBIA','DEN': 'COLORADO',
            'DFW': 'TEXAS','DSM': 'IOWA','DTW': 'MICHIGAN','EGE': 'COLORADO','ELP': 'TEXAS','EWR': 'NEW_JERSEY','FAT': 'CALIFORNIA',
            'FLL': 'FLORIDA','GEG': 'WASHINGTON','GSO': 'NORTH_CAROLINA','GUC': 'COLORADO','HDN': 'COLORADO','HNL': 'HAWAII','HOU': 'TEXAS',
            'IAD': 'DIST._OF_COLUMBIA','IAH': 'TEXAS','ICT': 'KANSAS','ILM': 'NORTH_CAROLINA','IND': 'INDIANA','JAC': 'WYOMING','JAX': 'FLORIDA',
            'JFK': 'NEW_YORK','KOA': 'HAWAII','LAS': 'NEVADA','LAX': 'CALIFORNIA','LBB': 'TEXAS','LGA': 'NEW_YORK','LIH': 'HAWAII','LIT': 'ARKANSAS',
            'MCI': 'MISSOURI','MCO': 'FLORIDA','MDT': 'PENNSYLVANIA','MEM': 'TENNESSEE','MFE': 'TEXAS','MIA': 'FLORIDA','MKE': 'WISCONSIN',
            'MSP': 'MINNESOTA','MSY': 'LOUISIANA','MTJ': 'COLORADO','OAK': 'CALIFORNIA','OGG': 'HAWAII','OKC': 'OKLAHOMA','OMA': 'NEBRASKA',
            'ONT': 'CALIFORNIA','ORD': 'ILLINOIS','ORF': 'VIRGINIA','PBI': 'FLORIDA','PDX': 'OREGON','PHL': 'PENNSYLVANIA','PHX': 'ARIZONA',
            'PIT': 'PENNSYLVANIA','PNS': 'FLORIDA','PSP': 'CALIFORNIA','PVD': 'RHODE_ISLAND','PWM': 'MAINE','RDU': 'NORTH_CAROLINA',
            'RIC': 'VIRGINIA','RNO': 'NEVADA','ROC': 'NEW_YORK','RSW': 'FLORIDA','SAN': 'CALIFORNIA','SAT': 'TEXAS','SDF': 'KENTUCKY',
            'SEA': 'WASHINGTON','SFO': 'CALIFORNIA','SJC': 'CALIFORNIA','SJU': 'PUERTO_RICO','SLC': 'UTAH','SMF': 'CALIFORNIA',
            'SNA': 'CALIFORNIA','STL': 'MISSOURI','STT': 'VIRGIN_ISLANDS','STX': 'VIRGIN_ISLANDS','SYR': 'NEW_YORK','TPA': 'FLORIDA',
            'TUL': 'OKLAHOMA','TUS': 'ARIZONA','XNA': 'ARKANSAS'
        };
        this.travels = [];
        let that = this;
        // setTimeout(function(){
            that.travels = that.getFlights();
        // },70000)
        // this.getAirportStates();
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
                // console.log([data.MONTH,data.DAY]);
            }
            travels[[data.MONTH,data.DAY]].push([that.airport_states[data.ORIGIN_AIRPORT],that.airport_states[data.DESTINATION_AIRPORT]]);
        })
        // console.log(travels);
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
        var cont = true;
        setTimeout(function(){  //get around time issue by creating json/csv file of data beforehand and reading from it.
            if (cont){
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
            }else{
                // console.log("no part 2");
            }
            // console.log(that.airport_states);
        },65000)
        console.log('part1');
        part1.forEach(function(port){
            DataFetcher.getAirport(port).then(response => {
                that.airport_states[port] = response.state_full.split(" ").join("_");
            })
            .catch(error => {
                console.log(error);
                cont = false;
                // alert("Comeback in 2 minutes and Reload");
                that.airport_states[port] = "nowhere";
            });
        })
    }
}

export default Flights;