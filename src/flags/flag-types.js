module.exports = {
    "harvester-normal": {
        start: function (creep) {
            return creep.store[RESOURCE_ENERGY] == 0;
        },
        stop: function (creep) {
            return creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
        },
        source: function (flag) {
            return flag.pos.findInRange(FIND_SOURCES, 0)[0].id;
        },
        name: "harvest",
        role: "harvester-normal"
    }
}