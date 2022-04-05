import State from "./state.js";
const population = {
    'CALIFORNIA': 39512223,'TEXAS': 28995881,'FLORIDA': 21477737,'NEW_YORK': 19453561,'PENNSYLVANIA': 12801989,'ILLINOIS': 12671821,
    'OHIO': 11689100,'GEORGIA': 10617423,'NORTH_CAROLINA': 10488084,'MICHIGAN': 9986857,'NEW_JERSEY': 8882190,'VIRGINIA': 8535519,
    'WASHINGTON': 7614893,'ARIZONA': 7278717,'MASSACHUSETTS': 6949503,'TENNESSEE': 6833174,'INDIANA': 6732219,'MISSOURI': 6137428,
    'MARYLAND': 6045680,'WISCONSIN': 5822434,'COLORADO': 5758736,'MINNESOTA': 5639632,'SOUTH_CAROLINA': 5148714,'ALABAMA': 4903185,
    'LOUISIANA': 4648794,'KENTUCKY': 4467673,'OREGON': 4217737,'OKLAHOMA': 3956971,'CONNECTICUT': 3565287,'UTAH': 3205958,
    'IOWA': 3155070,'NEVADA': 3080156,'ARKANSAS': 3017825,'MISSISSIPPI': 2976149,'KANSAS': 2913314,'NEW_MEXICO': 2096829,
    'NEBRASKA': 1934408,'IDAHO': 1787065,'WEST_VIRGINIA': 1792147,'HAWAII': 1415872,'NEW_HAMPSHIRE': 1359711,'MAINE': 1344212,
    'MONTANA': 1068778,'RHODE_ISLAND': 1059361,'DELAWARE': 973764,'SOUTH_DAKOTA': 884659,'NORTH_DAKOTA': 762062,'ALASKA': 731545,
    'DIST._OF_COLUMBIA': 705749,'VERMONT': 623989,'WYOMING': 578759
};

class Simulation{
    constructor(data){
        this.initial_num = 100;
        this.r_number = 0;
        this.recover = 0;
        this.location = '';
        this.num_passengers = 100;
        this.intervalId = 0;
        this.flights = data;
        this.date = Object.keys(data)[0].split(",").map(function(item){return parseInt(item);})
        this.lockdown = {}
        this.states = {};
        this.available_states = Object.keys(population);
        let that = this;
        this.available_states.forEach(function(ele){
            that.lockdown[ele] = false;
        })
        this.colors = {0:'lightcyan',0.1:'paleturquoise'
        ,0.2:'mediumturquoise',0.3:'darkturquoise'
        ,0.4:'cadetblue',0.5:'lightcoral',0.6:'salmon'
        ,0.7:'red',0.8:'firebrick',0.9:'darkred',1:'purple'};
        this.populate();
        // console.log(this.states);
        console.log(this.available_states);
    }

    populate(){
        var places = this.available_states;
        for(let i = 0; i < places.length ;i++){
            this.states[places[i]] = new State(places[i],population[places[i]]);
        }
    }

    addLockdown(){
        var location = document.getElementById('lockdowns');
        var lock = document.getElementById('lock-limit');
        var lift = document.getElementById('lift-limit');
        this.states[location.value].allow_lockdown = true;

        this.states[location.value].lock_limit = lock.value;
        this.states[location.value].lift_limit = lift.value;
    }

    removeLock(location){
        this.states[location].allow_lockdown = false;
    }

    setValues(){
        this.location = document.getElementById('location').value;
        this.r_number = document.getElementById('r-number').value;
        this.recover = document.getElementById('recovery-number').value;
    }

    simulate(){
        this.setValues();
        this.states[this.location].infected = this.initial_num;
        let that = this;
        this.intervalId = setInterval(function(){
            console.log(that.date);
            var data = that.flights[that.date];
            // debugger;
            that.updateStates(data);
            that.updateMap();
            that.date = that.nextDay(that.date);
            // if(that.date[0] > 8){debugger;}
        },100)
    }

    updateStates(data){
        let that = this;
        this.available_states.forEach(function(ele){
            var num = that.states[ele].infected;
            that.states[ele].infected = Math.floor(num * (1 - that.recover));
        })
        data.forEach(function(flight){
            var origin = flight[0];
            var dest = flight[1];
            if(that.available_states.includes(origin) && that.available_states.includes(dest)
            && !that.lockdown[origin] && !that.lockdown[dest]){
                var origin_state = that.states[origin];
                var dest_state = that.states[dest];
                origin_state.population -= that.num_passengers;
                var infected = Math.floor(origin_state.percent * 100);
                dest_state.population += 100;
                dest_state.infected += infected;
            }
        })
        this.available_states.forEach(function(ele){
            var num = that.states[ele].infected;
            var new_inf = Math.ceil(num * that.r_number);
            if (new_inf > that.states[ele].population){
                that.states[ele].infected = that.states[ele].population;
            }else{
                that.states[ele].infected = new_inf;
            }
            that.states[ele].update();
        })
        this.available_states.forEach(function(ele){
            if(that.states[ele].allow_lockdown){
                that.lockdown[ele] = that.states[ele].lockdown;
            }
        })
    }

    updateMap(){
        let that = this;
        this.available_states.forEach(function(ele){
            var percent = parseFloat(that.states[ele].percent.toFixed(1));
            var color = that.colors[percent];
            var state = document.getElementsByClassName(ele)[0];
            // debugger;
            state.style.fill = color;
        })
    }

    reset(){
        console.log('resetting');
        clearInterval(this.intervalId);
        this.populate();
        this.updateMap();
        let that = this;
        this.available_states.forEach(function(ele){
            that.lockdown[ele] = false;
        })
        var locks = document.querySelectorAll('.lockeddown');
        var real_locks = locks ? locks : [];
        for (let i =0;i<real_locks.length;i++){
            real_locks[i].remove();
        }
    }

    //31: 1,3,5,7,8,12
    //30: 4,6,9,11
    //28: 2,
    //no october(10)
    nextDay(date){
        var day = date[1];
        var month = date[0];
        // debugger;
        day += 1;
        if([1,3,5,7,8,12].includes(month)){
            if (day === 32){
                day = 1;
                if(month === 12){
                    month = 1;
                    //stop interval
                    clearInterval(this.intervalId);
                    debugger;
                }else{
                    month += 1;
                }
            }
        }else if([4,6,9,11].includes(month)){
            if (day === 31){
                day = 1;
                month += 1;
                if (month === 10){month += 1;}   //No october flights
            }
        }else{
            if (day === 29){
                day = 1;
                month += 1;
            }
        }
        return [month,day];
    }
}

export default Simulation;