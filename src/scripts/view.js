import Simulation from "./simulation";
var stateNames = ['MAINE','NEW_HAMPSHIRE','DELAWARE','DIST._OF_COLUMBIA','nowhere','nowhere','nowhere',
        'SOUTH_CAROLINA','NEBRASKA','WASHINGTON','NEW_MEXICO','nowhere','SOUTH_DAKOTA','TEXAS','CALIFORNIA','KENTUCKY',
        'OHIO','ALABAMA','GEORGIA','WISCONSIN','ARKANSAS','OREGON','PENNSYLVANIA','MISSISSIPPI','COLORADO','UTAH',
        'OKLAHOMA','TENNESSEE','WEST_VIRGINIA','NEW_YORK','INDIANA','KANSAS','NEVADA','ILLINOIS','VERMONT','CONNECTICUT',
        'MONTANA','MINNESOTA','MARYLAND','HAWAII','ARIZONA','RHODE_ISLAND','MISSOURI','NORTH_CAROLINA','VIRGINIA','WYOMING',
        'LOUISIANA','MICHIGAN','MASSACHUSETTS','IDAHO','FLORIDA','ALASKA','nowhere','NEW_JERSEY','NORTH_DAKOTA','IOWA'];

class View{
    constructor(data){
        this.createMap();
        this.createForm();
        this.data = data;
        this.sim = new Simulation(data,document);

        this.start = document.getElementById('start');
        this.startSim = this.startSim.bind(this);
        this.start.addEventListener('click',this.startSim);

        this.add = document.getElementById('add');
        this.addLock = this.addLock.bind(this);
        this.add.addEventListener('click',this.addLock);

        this.removeLock = this.removeLock.bind(this);

        this.reset = document.getElementById('reset');
        this.startOver = this.startOver.bind(this);
        this.reset.addEventListener('click',this.startOver);
    }
    createMap(){
        var margin = { top:0,left:0,right:0,bottom:0},
        width = 960 - margin.top - margin.bottom,
        height = 600 - margin.left - margin.right;
        var svg = d3.select('#map')
            .append('svg')
            .attr('width',width + margin.left + margin.right)
            .attr('height',height + margin.top + margin.bottom);
        var url = d3.json('https://cdn.jsdelivr.net/npm/@d3ts/us-atlas@1/states-10m.json');
        var g = svg.append('g');
        var projection = d3.geoAlbersUsa().scale(1000);//.translate([width/2,height/2]);
        var path = d3.geoPath().projection(projection);
        let i = -1;
        url.then(function(data) {
            var states = topojson.feature(data,data.objects.states).features;
            g.selectAll('path')
                .data(states)
                .enter().append('path')
                .attr('class',function(){
                    i += 1;
                    return stateNames[i];
                })
            .attr('id','state')
            .attr('d',path);
        })
    }
    createForm(){
        // var form = document.getElementById('sim-info');
        // var form = document.createElement('form')
        //     .attr('id','user-input')
        //     .attr('')
        //     .attr('width',width)
        //     .attr("height",height);
        // box.appendChild(form);
        var drop = document.getElementById('location');
        var lock = document.getElementById('lockdowns');
        var names = stateNames.slice(0).sort();
        names.forEach(name => {
            if(name !== "nowhere"){
                var opt = document.createElement('option');
                opt.textContent = name.split("_").join(" ");
                opt.value = name;
                drop.appendChild(opt);
                
                var state = document.createElement('option');
                state.textContent = name.split("_").join(" ");
                state.value = name;
                lock.appendChild(state);
            }
        })

    }
    startSim(e){
        var location = document.getElementById('location');
        var r_number = document.getElementById('r-number');
        var recover = document.getElementById('recovery-number');
        if(location.value === "" || r_number.value < 0 || r_number > 100 || recover < 0 || recover > 1){
            alert("Invalid Input(s)");
            e.preventDefault();
        }else{
            this.sim.simulate();
        }
    }
    addLock(e){         //events adding elements to html reload dom which triggers reload sequence
        var location = document.getElementById('lockdowns');
        if(location.value === ''){
            alert("You must choose a state");
            e.preventDefault();
        }else{
            var lock = document.getElementById('lock-limit');
            var lift = document.getElementById('lift-limit');
            var list = document.getElementById('lockdown-states');
            var states = list.getElementsByTagName('button');
            for (let i = 0; i< states.length;i++){
                if(states[i].value === location.value){
                    alert("This state has already been added.")
                    e.preventDefault();
                }
            }
            debugger;
            if(lock.value <= lift.value){
                debugger;
                alert("Invalid Limits");
                e.preventDefault();
            }else{
                debugger;
                this.sim.addLockdown();
                var new_state = document.createElement('button');
                new_state.setAttribute('value',location.value);
                new_state.setAttribute('class','lockeddown');
                var content = `${location.value} ${lock.value} ${lift.value}`;
                var info = document.createTextNode(content);
                new_state.appendChild(info);
                list.appendChild(new_state);
                debugger;
                
                // let that = this;       
                new_state.addEventListener('click',this.removeLock);
                debugger;
            }
        }
    }
    removeLock(e){
        var place = e.target;
        var location = place.value;
        place.remove();
        this.sim.removeLock(location);
    }
    startOver(e){
        this.sim.reset();
    }
}

export default View;