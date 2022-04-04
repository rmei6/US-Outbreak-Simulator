var stateNames = ['MAINE','NEW_HAMPSHIRE','DELAWARE','DIST._OF_COLUMBIA','nowhere','nowhere','nowhere',
        'SOUTH_CAROLINA','NEBRASKA','WASHINGTON','NEW_MEXICO','nowhere','SOUTH_DAKOTA','TEXAS','CALIFORNIA','KENTUCKY',
        'OHIO','ALABAMA','GEORGIA','WISCONSIN','ARKANSAS','OREGON','PENNSYLVANIA','MISSISSIPPI','COLORADO','UTAH',
        'OKLAHOMA','TENNESSEE','WEST_VIRGINIA','NEW_YORK','INDIANA','KANSAS','NEVADA','ILLINOIS','VERMONT','CONNECTICUT',
        'MONTANA','MINNESOTA','MARYLAND','HAWAII','ARIZONA','RHODE_ISLAND','MISSOURI','NORTH_CAROLINA','VIRGINIA','WYOMING',
        'LOUISIANA','MICHIGAN','MASSACHUSETTS','IDAHO','FLORIDA','ALASKA','nowhere','NEW_JERSEY','NORTH_DAKOTA','IOWA'];

class View{
    constructor(){
        this.createMap();
        this.createForm();
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
}

export default View;