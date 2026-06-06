module.exports = {
    run: function(creep){
        var coloredPath = {visualizePathStyle:{stroke: "#f39c12", opacity: 0.25, lineStyle: 'dashed'}};
        var closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.building = false;

        }
        if(creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
            creep.memory.building = true;
        }
        if(creep.memory.building){
            const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (target) {
                if (creep.build(target) === ERR_NOT_IN_RANGE) {
                  creep.moveTo(target, coloredPath);
                }
            }
            else{
                var valid = [
                    STRUCTURE_SPAWN,
                    STRUCTURE_CONTAINER
                ]
                var closestSpawn = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => valid.includes(structure.structureType) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0});
                if(creep.transfer(closestSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    
                    creep.moveTo(closestSpawn, coloredPath);
                }
            }
        }
        else{
            if(creep.harvest(closestSource) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestSource, coloredPath);
            }
        }
    }
};
