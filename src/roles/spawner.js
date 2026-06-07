module.exports = {
    run: function (spawn, count) {
        for (type in count) {
            var creep = _.filter(Game.creeps, (creep) => creep.memory.role == count[type].variables.role);
            if (creep.length < count[type].numbers) {
                spawn.spawnCreep(count[type].body, count[type].variables.role + " " + Game.time, { memory: count[type].variables });
                break;
            }
            if (creep.length > count[type].numbers) {

                var killSomeone = _.find((Game.creeps), (creep) => creep.memory.role == count[type].variables.role && creep.store.getUsedCapacity() == 0);
                killSomeone.suicide();
            }
        }
    }
};
