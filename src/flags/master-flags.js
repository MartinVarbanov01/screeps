var priorityList = require("priority-list");
var flagTypes = require("flags.flag-types");
module.exports = function (flag, delay) {
    if (Object.keys(flag.memory) == 0) {
        var flagT = _.find(flagTypes, (flagType)=> flag.name.includes(flagType.name)).role;
        console.log(flagT);
        flag.memory.source = flagTypes[flagT].source(flag);
        flag.memory.role = flagT;
        flag.memory.number = 0;
    }
    if (priorityList.low.includes(delay)) {
        var creeps = flag.room.find(FIND_MY_CREEPS, { filter: (creep) => creep.memory.source == flag.memory.source });
        var creepsToLose = _.filter(creeps, (creep) => flagTypes[flag.memory.role].stop(creep));

        for (name in creepsToLose) {
            Game.creeps[creepsToLose[name].name].memory.source = null;
        }
        if (creeps.length < flag.memory.number) {
            for (room in Game.rooms) {
                let creep = Game.rooms[room].find(FIND_MY_CREEPS, { filter: (creep) => creep.memory.role == flag.memory.role && creep.memory.source == null && flagTypes[flag.memory.role].start(creep) })[0];
                console.log(creep);
                if(!creep){
                    continue;
                }
                creep.memory.source = flag.memory.source;
            }
        }
        flag.setColor(creeps.length == 0 ? COLOR_RED : creeps.length == flag.memory.number ? COLOR_GREEN : COLOR_ORANGE);
    }
}