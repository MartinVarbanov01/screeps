var clearDeadCreeps = require("misc.clearMemory");
var showRole = require("misc.showSpawningRole");
var spawners = require("roles.spawner");
var harvesters = require("roles.harvester.harvester");
var builders = require("roles.builder");
var attacker = require("roles.attacker");
var bigBoy = require("roles.big-boy");
var upgrader = require("roles.upgrader");
var count = {
    harvesters:{
        variables:{
            role:"harvester"
        },
        numbers:0,
        body:[WORK, CARRY, MOVE],
        run:harvesters.run
    },
    upgraders:{
        variables:{
            role:"upgrader",
            upgrading:false
        },
        numbers:3,
        body:[WORK, CARRY, CARRY, CARRY, MOVE],
        run:upgrader.run
    },
    builders:{
        variables:{
            role:"builder",
            building:false
        },
        numbers:6,
        body:[WORK, CARRY, CARRY, CARRY, MOVE],
        run:builders.run
    },
    attackers:{
        variables:{
            role:"attackers"
        },
        numbers:4,
        body:[RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE],
        run:attacker.run
    },
    bigBoys:{
        variables:{
            role:"bigBoy"
        },
        numbers:0,
        body:[ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, MOVE],
        run:bigBoy.run
    }
}

module.exports.loop = function () {
    clearDeadCreeps.run();
    showRole.run();
    for(obj in Game.spawns){
        spawners.run(Game.spawns[obj],count);
    }
    for(name in Game.creeps){
        var creep = Game.creeps[name];
        var type = _.find(count, (c)=> c.variables.role == creep.memory.role);
        type.run(creep);
    }
}

