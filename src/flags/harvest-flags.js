module.exports = function (flag, delay) {
    if (flag.memory.source == null || flag.memory.source == undefined) {
        flag.memory.source = flag.pos.findClosestByRange(FIND_SOURCES_ACTIVE).id;
        flag.memory.color = COLOR_GREEN;
    }
    if (Game.time - flag.memory.tick > 10) {
        flag.memory.color = COLOR_GREEN;
        flag.setColor(COLOR_GREEN);
    }
    //console.log(flag.memory.source);
}