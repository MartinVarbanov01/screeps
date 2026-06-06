var hostileCreeps = require("hostile");
module.exports = function (creep) {
    var coloredPath = { visualizePathStyle: { stroke: "#e74c3c", opacity: 0.75, lineStyle: 'dashed' } };

    for (thing in hostileCreeps.hostile-creeps) {
        var enemy = creep.pos.findClosestByPath(hostileCreeps.hostile-creeps[thing]);
        var flag = creep.pos.findClosestByPath(FIND_FLAGS, { filter: (flag) => { flag.name == "Flag1" } })
        if (!enemy) {
            continue;
        }
        if (creep.rangedAttack(enemy) == ERR_NOT_IN_RANGE) {
            if (flag) {
                creep.moveTo(flag)
            }
            else {
                creep.moveTo(enemy, coloredPath);
            }
        }
    }
};