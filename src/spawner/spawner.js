var creepsConfig = require("creeps-config");
const priorityList = require("priority-list");

module.exports = {
    run: function (delay) {
        if(!priorityList.lowest.includes(delay)){
            return;
        }
        for (type in creepsConfig) {
            let allCreepsWithRole = _.filter(Game.creeps, (creep) => creep.memory.role == type);
            if (allCreepsWithRole.length < creepsConfig[type].numbers) {
                let spawner = _.find(Game.spawns, (spawns) => spawns.spawning == null);
                if (!spawner) {// Couldn't find an empty spawner
                    break;
                }
                spawner.spawnCreep(creepsConfig[type].body, type + " " + Game.time, { memory: {"role":type, ...creepsConfig[type].variables }});
                continue;
            }
            if (allCreepsWithRole.length > creepsConfig[type].numbers) {
                var killSomeone = _.filter((Game.creeps), (creep) => creep.memory.role == type && creep.store.getUsedCapacity() == 0);
                if(killSomeone.length == 0){//can't find such creeps
                    continue;
                }
                killSomeone.sort((a, b) => { a.ticksToLive - b.ticksToLive })
                killSomeone[0].suicide();
            }
        }
    }
};
