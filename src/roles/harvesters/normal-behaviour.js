var builderBehaviour = require("roles.builder");
module.exports = function (creep, delay) {
    var coloredPath = { visualizePathStyle: { stroke: "#27ae60", opacity: 0.25, lineStyle: 'dashed' } };

    if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity(RESOURCE_ENERGY)) {
        if (creep.memory.flag == null) {
            let closestFlagSource = creep.room.find(FIND_FLAGS, { filter: (flag) => flag.name.includes("source") && flag.memory.color == COLOR_GREEN })[0];
            if(!closestFlagSource){
                return;
            }
            console.log("Harvester "+creep.name + " wants " + closestFlagSource.name);
            closestFlagSource.memory.color = COLOR_RED;
            closestFlagSource.setColor(COLOR_RED);
            creep.memory.flag = closestFlagSource.name;
        }
        if (creep.memory.flag) {

            var flag = creep.room.find(FIND_FLAGS, { filter: (flag) => flag.name == creep.memory.flag })[0];
            flag.memory.tick = Game.time
        }
        else {
            return; //Change role??
        }
        var source = creep.room.find(FIND_SOURCES_ACTIVE, { filter: (source) => source.id == flag.memory.source })[0]
        if (creep.pos.inRangeTo(flag, 0)) {
            creep.harvest(source);
        }
        else {
            creep.moveTo(flag, coloredPath);
        }
    }
    else {
        creep.memory.flag = null;
        var valid = [
            STRUCTURE_SPAWN,
            STRUCTURE_EXTENSION,
            STRUCTURE_TOWER,
            STRUCTURE_STORAGE,
            STRUCTURE_CONTAINER,
        ]
        var closestSpawn = creep.room.find(FIND_STRUCTURES,
            {
                filter: (structure) => valid.includes(structure.structureType)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            })[0];
        if (creep.transfer(closestSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestSpawn, coloredPath);
        }
    }
};
