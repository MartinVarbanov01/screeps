var hostileCreeps = require("hostile");
module.exports = function (creep) {
    var coloredPath = { visualizePathStyle: { stroke: "#e74c3c", opacity: 0.75, lineStyle: 'dashed' } };
    var enemy;
    for(hostile in hostileCreeps["hostile-creeps"]["types"]){
        enemy = creep.pos.findClosestByPath(hostileCreeps["hostile-creeps"]["types"][hostile]);
        if (enemy){
            break;
        }
    }
    var flag = creep.pos.findClosestByPath(FIND_FLAGS, 
        { filter: (flag) =>  flag.name == "attack" });
    if (flag) {
        creep.moveTo(flag, coloredPath);
    }
    if (creep.rangedAttack(enemy) == ERR_NOT_IN_RANGE) {
        creep.moveTo(enemy, coloredPath);
    }
};