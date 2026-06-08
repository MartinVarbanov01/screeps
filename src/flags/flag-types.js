module.exports = {
    "harvester-normal": {
        start: function(creep) {
            return creep.store[RESOURCE_ENERGY] == 0;
        },
        stop:function(creep){
            return creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
        }
    }
}