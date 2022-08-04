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
        this.createLegend();
        this.createForm();
        // debugger;
        this.data = data;
        // console.log(data);
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

        this.pause = document.getElementById('pause');
        this.pauseSim = this.pauseSim.bind(this);
        this.pause.addEventListener('click',this.pauseSim);

        this.unpause = document.getElementById('unpause');
        this.unpauseSim = this.unpauseSim.bind(this);
        this.unpause.addEventListener('click',this.unpauseSim);

        let that = this;
        setTimeout(function(){
            // debugger;
            const tooltip = d3.select(`body`)
                            .append('div')
                            .attr('class','tooltip-donut')
                            .style('position','absolute')
                            .style('opacity','0')
                            .html('initial');
            var states = d3.selectAll('.state');
            states.on('mouseover',function(){
                // console.log(this.id);
                var state = that.sim.states[this.id];
                // var state = 
                d3.select(this).transition()
                    .duration(50)
                    .attr('opacity','.85');
                tooltip.transition()
                    .duration(50)
                    .style('opacity','1');
                tooltip.html(`${state.name.split("_").join(" ")}<br>
                                 Population: ${state.population.toLocaleString('en-US')}<br>
                                 Infected: ${state.infected.toLocaleString('en-US')}<br>
                                 Percentage: ${Math.ceil(state.percent * 100)}%<br>
                                 ${state.allow_lockdown ? `${state.lockdown ? 'Under Lockdown' : 'Lockdown Lifted'}` : `No Lockdown Protocol`}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 15) + "px");
            })
            .on('mouseout', function () {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '1');
                tooltip.transition()
                     .duration('50')
                     .style("opacity", 0);
           });
        },2000) //time for map to load
    }
    createMap(){
        // debugger;
        // maybe get the min between window.innerwidth and window.outerwidth
        var window_width = window.innerWidth < window.outerWidth ? window.innerWidth : window.outerWidth;
        var margin = { top:0,left:0,right:0,bottom:0},
        // var margin = { top:0,left:-1000,right:0,bottom:0},
        // width = 880 - margin.top - margin.bottom,   //change width and height to adjust to screen width
        // height = 500 - margin.left - margin.right;
        width = (window_width * 0.9) - margin.left - margin.right,   //change width and height to adjust to screen width
        height = (window_width * 0.9 / 1.76) - margin.top - margin.bottom;
        var svg = d3.select('#map')
            .append('svg')
            .attr('width',width + margin.left + margin.right)
            .attr('height',height + margin.top + margin.bottom);
        var url = d3.json('https://cdn.jsdelivr.net/npm/@d3ts/us-atlas@1/states-10m.json');
        var g = svg.append('g');
        // var projection = d3.geoAlbersUsa().scale(1000);//.translate([width/2,height/2]);
        var projection = d3.geoAlbersUsa().scale(window_width * 0.75);//.translate([width/2,height/2]);
        var path = d3.geoPath().projection(projection);
        let i = -1;
        url.then(function(data) {
            var states = topojson.feature(data,data.objects.states).features;
            g.selectAll('path')
                .data(states)
                .enter().append('path')
                .attr('id',function(){
                    i += 1;
                    return stateNames[i];
                })
            .attr('class','state')
            .attr('d',path);
        })
    }
    createLegend(){
        var window_width = window.innerWidth < window.outerWidth ? window.innerWidth : window.outerWidth;
        var svg = d3.select("#legend").append('svg').attr('width','800').attr('height','80');
        // var svg = d3.select("#legend").append('svg').attr('width',screen.width * 0.8).attr('height','80');
        var keys = ['0','10','20','30','40','50','60','70','80','90','100'];
        var color = ['lightcyan','paleturquoise','mediumturquoise','darkturquoise','cadetblue','lightcoral','salmon','red','firebrick','darkred','purple'];
        // var size = screen.width * 0.1           //do 
        var size = window_width < 375 ? window_width / 12.5 : 30           
        svg.selectAll("mydots")
        .data(keys)
        .enter()
        .append("rect")
        .attr("y", 30)
        // .attr("x", function(d,i){ return size*5 + i*(size+2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("x", function(d,i){ return i*(size+2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", 15)
        .style("fill", function(d,i){ return color[i]})
        
        // Add one dot in the legend for each name.
        svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
        .attr("y", 40 + size)
        // .attr("y", size)
        // .attr("x", function(d,i){ return i*(size+2) + (size*5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("x", function(d,i){ return i*(size+2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d,i){ return color[i]})
        .text(function(d,i){ return keys[i]})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

        svg.append('text')
            .attr('x',size)
            .attr('y',20)
            .style('fill','white')
            .text('Percentage of population infected');
        
        // var svg = d3.select("#legend").append('svg').attr('width','450').attr('height','300');
        // svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "lightcyan")
        // svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "paleturquoise")
        // svg.append("circle").attr("cx",200).attr("cy",190).attr("r", 6).style("fill", "mediumturquoise")
        // svg.append("circle").attr("cx",200).attr("cy",220).attr("r", 6).style("fill", "darkturquoise")
        // svg.append("circle").attr("cx",200).attr("cy",250).attr("r", 6).style("fill", "cadetblue")
        // svg.append("circle").attr("cx",260).attr("cy",130).attr("r", 6).style("fill", "lightcoral")
        // svg.append("circle").attr("cx",260).attr("cy",160).attr("r", 6).style("fill", "salmon")
        // svg.append("circle").attr("cx",260).attr("cy",190).attr("r", 6).style("fill", "red")
        // svg.append("circle").attr("cx",260).attr("cy",220).attr("r", 6).style("fill", "firebrick")
        // svg.append("circle").attr("cx",260).attr("cy",250).attr("r", 6).style("fill", "darkred")
        // svg.append("circle").attr("cx",260).attr("cy",280).attr("r", 6).style("fill", "purple")
        // svg.append("text").attr("x", 220).attr("y", 130).text("0%").style("font-size", "15px").attr("alignment-baseline","middle")
        // svg.append("text").attr("x", 220).attr("y", 160).text("10%").style("font-size", "15px").attr("alignment-baseline","middle")
        // svg.append("text").attr("x", 220).attr("y", 190).text("20%").style("font-size", "15px").attr("alignment-baseline","middle")
        // svg.append("text").attr("x", 220).attr("y", 220).text("30%").style("font-size", "15px").attr("alignment-baseline","middle")
        // svg.append("text").attr("x", 220).attr("y", 250).text("40%").style("font-size", "15px").attr("alignment-baseline","middle")
        // svg.append("text").attr("x", 280).attr("y", 130).text("50%").style("font-size", "15px").attr("alignment-baseline","middle")
        // svg.append("text").attr("x", 280).attr("y", 160).text("60%").style("font-size", "15px").attr("alignment-baseline","middle")
        // svg.append("text").attr("x", 280).attr("y", 190).text("70%").style("font-size", "15px").attr("alignment-baseline","middle")
        // svg.append("text").attr("x", 280).attr("y", 220).text("80%").style("font-size", "15px").attr("alignment-baseline","middle")
        // svg.append("text").attr("x", 280).attr("y", 250).text("90%").style("font-size", "15px").attr("alignment-baseline","middle")
        // svg.append("text").attr("x", 280).attr("y", 280).text("100%").style("font-size", "15px").attr("alignment-baseline","middle")
    }
    createForm(){
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
            this.start.style.display = 'none';
            this.pause.style.display = 'block';
            var locks = document.getElementById('state-info');
            locks.style.display = 'none';
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
            var free = true;
            for (let i = 0; i< states.length;i++){
                if(states[i].value === location.value){
                    alert("This state has already been added.")
                    free = false;
                    e.preventDefault();
                    break;
                }
            }
            if(free){
                // debugger;
                if(lock.value < lift.value || lock.value < 0 || lift.value < 0 || lock.value > 100 || lift.value > 100 || lock.value === lift.value){
                    // debugger;
                    alert("Invalid Limits");
                    e.preventDefault();
                }else{
                    // debugger;
                    e.preventDefault(); //to prevent page from reloading
                    this.sim.addLockdown();
                    var new_state = document.createElement('button');
                    new_state.setAttribute('value',location.value);
                    new_state.setAttribute('class','lockeddown');
                    new_state.style.border = '1px solid white';
                    new_state.style.borderRadius = '3px';
                    new_state.style.margin = '5px';
                    new_state.style.padding = '5px';
                    new_state.style.cursor = "pointer";
                    var content = `${location.value.split('_').join(" ")}<br>Lockdown: ${lock.value}%<br>Lift: ${lift.value}%`;
                    new_state.innerHTML = content;
                    list.appendChild(new_state);
                    // debugger;
                    new_state.addEventListener('click',this.removeLock);
                    // debugger;
                }
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

    pauseSim(e){
        this.pause.style.display = 'none';
        this.unpause.style.display = 'block';
        this.sim.pauseSim();
    }

    unpauseSim(e){
        this.unpause.style.display = 'none';
        this.pause.style.display = 'block';
        this.sim.startSim();
    }
}

export default View;