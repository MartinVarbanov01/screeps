module.exports = function (creep) {
    var closestSource = creep.room.find(FIND_SOURCES_ACTIVE)[0];
    var coloredPath = { visualizePathStyle: { stroke: "#27ae60", opacity: 0.25, lineStyle: 'dashed' } };
    if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
        if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestSource, coloredPath);
        }
    } else {
        var valid = [
            STRUCTURE_SPAWN,
            STRUCTURE_EXTENSION,
            STRUCTURE_TOWER,
            STRUCTURE_STORAGE,
            STRUCTURE_CONTAINER,
        ]
        var closestSpawn = creep.room.find(FIND_STRUCTURES, { filter: (structure) => valid.includes(structure.structureType) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 })[0];
        if (creep.transfer(closestSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestSpawn, coloredPath);
        }
    }
};
