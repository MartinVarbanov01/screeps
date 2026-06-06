var normalBehaviour = require("roles.harvester.normal-behaviour");
module.exports = {
    run: function(creep){
        var coloredPath = {visualizePathStyle:{stroke: "#27ae60", opacity: 0.25, lineStyle: 'dashed'}};
        normalBehaviour(creep, coloredPath);
        
    }
}