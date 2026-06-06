var clearDeadCreeps = require("misc.clearMemory");
var showRole = require("misc.showSpawningRole");
var spawners = require("roles.spawner");
var harvesterNormalBehaviour = require("roles.harvesters.normal-behaviour");
var harvesterFlagBehaviour = require("roles.harvesters.flag-behaviour");
var builders = require("roles.builder");
var attacker = require("roles.attacker");
var bigBoy = require("roles.big-boy");
var upgrader = require("roles.upgrader");
var workers = {
    harvestersNormal:{
        variables:{
            role:"harvester-normal"
        },
        numbers:4,
        body:[WORK, CARRY, MOVE],
        run:harvesterNormalBehaviour
    },
    harvestersFlag:{
        variables:{
            role:"harvester-flag"
        },
        numbers:4,
        body:[WORK, CARRY, MOVE],
        run:harvesterFlagBehaviour
    },
    upgraders:{
        variables:{
            role:"upgrader",
            upgrading:false
        },
        numbers:3,
        body:[WORK, CARRY, CARRY, CARRY, MOVE],
        run:upgrader
    },
    builders:{
        variables:{
            role:"builder",
            building:false
        },
        numbers:6,
        body:[WORK, CARRY, CARRY, CARRY, MOVE],
        run:builders
    },
    attackers:{
        variables:{
            role:"attackers"
        },
        numbers:4,
        body:[RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE],
        run:attacker
    },
    bigBoys:{
        variables:{
            role:"bigBoy"
        },
        numbers:0,
        body:[ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, MOVE],
        run:bigBoy
    }
}

module.exports.loop = function () {
    clearDeadCreeps.run();
    showRole.run();
    for(obj in Game.spawns){
        spawners.run(Game.spawns[obj],workers);
    }
    for(name in Game.creeps){
        var creep = Game.creeps[name];
        var type = _.find(workers, (c)=> c.variables.role == creep.memory.role);
        if(!type){
            creep.suicide();
        }
        type.run(creep);
    }
}

