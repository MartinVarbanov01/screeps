module.exports = function (creep, delay) {
    var coloredPath = { visualizePathStyle: { stroke: "#27ae60", opacity: 0.25, lineStyle: 'dashed' } };

    if (creep.memory.source) {
        var source = Game.getObjectById(creep.memory.source);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, coloredPath);
            
        }
    }
    else {
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
