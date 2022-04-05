class State{
    constructor(name,population){
        this.name = name;
        this.population = population;
        this.infected = 0;
        this.percent = 0;
        this.allow_lockdown = false;
        this.lockdown = false;
        this.lock_limit = 0;
        this.lift_limit = 0;
    }
    
    update(){
        this.percent = (this.infected / this.population);
        if(this.allow_lockdown){
            if (this.percent > this.lock_limit){
                this.lockdown = true;
            }else if(this.percent < this.lift_limit){
                this.lockdown = false;
            }
        }
    }
}

export default State;