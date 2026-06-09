module.exports = {
    run: function(){
        for(name in Memory.creeps){
            if(!Game.creeps[name]){
                delete Memory.creeps[name];
            }
        }
        for(flag in Memory.flags){
            if(!Game.flags[flag]){
                delete Memory.flags[flag];
            }
        }
    }
};
