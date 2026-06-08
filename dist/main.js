var clearDeadCreeps = require("misc.clearMemory");
var showRole = require("misc.showSpawningRole");
var spawners = require("spawner.spawner");
var creepsConfig = require("creeps-config");
var priority = require("priority-list");
var flagScript = require("flags.master-flags")
Memory.delay = 0;

module.exports.loop = function () {
    clearDeadCreeps.run();
    showRole.run();
    let delay = Memory.delay;
    if(delay == 0 || delay == null || delay == undefined){
        delay = 10;
        Memory.delay = delay;
    }
    delay--;
    spawners.run(delay);
    for (name in Game.creeps){
        var creep = Game.creeps[name];
        creepsConfig[creep.memory.role].run(creep,delay);
    }
    for(flag in Game.flags){
        var flag = Game.flags[flag];
        flagScript(flag,delay);
    }



    Memory.delay = delay;
}

