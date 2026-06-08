var normalHarvester = require("roles.harvesters.normal-behaviour");
var checkForHostile = require("misc.checkForHostiles");
var builderBehaviour = require("roles.builder");
module.exports = function (creep, delay) {
    var coloredPath = { visualizePathStyle: { stroke: "#27ae60", opacity: 0.25, lineStyle: 'dashed' } };
    var flagAway = creep.pos.findClosestByPath(FIND_FLAGS,
        {
            filter: (flag) => flag.name == "harvest-away"
                && flag.color == COLOR_GREEN
        });
    var flagHome = creep.pos.findClosestByPath(FIND_FLAGS,
        { filter: (flag) => flag.name == "harvest-home" });
    var spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
        { filter: (structure) => structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 });
    var exit = creep.pos.findClosestByPath(FIND_EXIT);
    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    if (checkForHostile(creep)) {
        return; //dont do anything if there are hostiles nearby, to prioritize safety
    }
    if (flagAway) {
        if (!spawn) {
            builderBehaviour(creep);
            return;
        }
        if (creep.store[RESOURCE_ENERGY] > 0) {
            if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn, coloredPath);
            }
            return; //RETURN EARLY TO PRIORITIZE TRANSFER
        }
        if (!creep.pos.inRangeTo(flagAway, 3)) {
            creep.moveTo(flagAway, coloredPath);
        }
        else {
            var exit = creep.pos.findClosestByPath(FIND_EXIT);
            creep.moveTo(exit, coloredPath);
        }
        return; //RETURN EARLY TO PRIORITIZE TRANSFER
    }
    if (flagHome) {
        if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity(RESOURCE_ENERGY)) {
            if (!creep.pos.inRangeTo(flagHome, 3)) {
                creep.moveTo(flagHome, coloredPath);
            }
            else {
                var exit = creep.pos.findClosestByPath(FIND_EXIT);
                creep.moveTo(exit, coloredPath);
            }
            return; //RETURN EARLY TO PRIORITIZE TRANSFER
        }
        if (creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, coloredPath);
        }
        return; //RETURN EARLY TO PRIORITIZE TRANSFER
    }
    normalHarvester(creep);
}
