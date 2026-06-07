module.exports = function (creep) {
    var coloredPath = { visualizePathStyle: { stroke: "#2980b9", opacity: 0.75, lineStyle: '' } };
    var closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.upgrading = false;

    }
    if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()) {
        creep.memory.upgrading = true;
    }
    if (creep.memory.upgrading) {
        const target = creep.pos.findClosestByPath(FIND_STRUCTURES, 
            { filter: (structure) => structure.structureType == STRUCTURE_CONTROLLER });
        if (target) {
            if (creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, coloredPath);
            }
        }
    }
    else {
        var container = creep.pos.findClosestByPath(FIND_STRUCTURES, 
            { filter: (structure) => structure.structureType == STRUCTURE_CONTAINER });
        if (container) {
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, coloredPath);
            }
        }
        else if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestSource, coloredPath);
        }
    }
};