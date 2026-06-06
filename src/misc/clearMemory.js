module.exports = {
    run: function(){for(name in Memory.creeps){
            if(!Game.creeps[name]){
                delete Memory.creeps[name];
            }
        }
    }
};
