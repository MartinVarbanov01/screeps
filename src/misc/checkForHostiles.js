var hostileCreeps = require("hostile");
module.exports = function (creep) {
    var enemy = hostileCreeps["hostile-creeps"]["types"];
    for (hostile in enemy) {
        return creep.pos.findInRange(enemy[hostile], 5).length > 0;
    }
}