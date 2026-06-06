module.exports = {
    run:function(){
        var spawningCreep =  Game.creeps[Game.spawns['Spawn1'].spawning?.name];
        if(spawningCreep){
            Game.spawns['Spawn1'].room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    Game.spawns['Spawn1'].pos.x + 1, 
                    Game.spawns['Spawn1'].pos.y, 
                    {align: 'left', opacity: 1});
        }
    }
};