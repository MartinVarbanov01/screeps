module.exports = {
    run:function(creep){
        var coloredPath = {visualizePathStyle:{stroke: "#e74c3c", opacity: 0.75, lineStyle: 'dashed'}};
        var priorityList = [
            FIND_HOSTILE_CREEPS,
            FIND_HOSTILE_POWER_CREEPS,
            FIND_HOSTILE_STRUCTURES,
            FIND_HOSTILE_SPAWNS,
            FIND_HOSTILE_CONSTRUCTION_SITES
        ]

        for(thing in priorityList){
            var enemy = creep.pos.findClosestByPath(priorityList[thing]);
            var flag = creep.pos.findClosestByPath(FIND_FLAGS, {filter: (flag) => {flag.name == "Flag1"}})
            if(!enemy){
                continue;
            }
            if(creep.rangedAttack(enemy) == ERR_NOT_IN_RANGE){
                if(flag){
                    creep.moveTo(flag)
                }
                else{
                    creep.moveTo(enemy, coloredPath);
                }
            }
        }
    }
};