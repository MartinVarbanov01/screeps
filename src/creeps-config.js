var harvesterNormalBehaviour = require("roles.harvesters.normal-behaviour");
var harvesterFlagBehaviour = require("roles.harvesters.flag-behaviour");
var builders = require("roles.builder");
var attacker = require("roles.attacker");
var bigBoy = require("roles.big-boy");
var upgrader = require("roles.upgrader");

module.exports = {
    "harvester-normal": {
        variables: {},
        numbers: 30,
        body: [WORK, WORK, CARRY, MOVE],
        run: harvesterNormalBehaviour
    },
    "harvester-flag": {
        variables: {},
        numbers: 0,
        body: [WORK, CARRY, MOVE],
        run: harvesterFlagBehaviour
    },
    "upgrader": {
        variables: {
            upgrading: false
        },
        numbers: 0,
        body: [WORK, CARRY, CARRY, CARRY, MOVE],
        run: upgrader
    },
    "builder": {
        variables: {
            building: false
        },
        numbers: 0,
        body: [WORK, CARRY, MOVE],
        run: builders
    },
    "attackers": {
        variables: {},
        numbers: 0,
        body: [ATTACK, ATTACK, MOVE, MOVE],
        run: attacker
    },
    "bigBoy": {
        variables: {},
        numbers: 0,
        body: [ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, MOVE],
        run: bigBoy
    }
}