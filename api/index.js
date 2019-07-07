var fs = require('fs');

module.exports = function(app){
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        let name = file.substr(0, file.indexOf('.'));
        try {
            require('./' + name)(app);
        } catch(ex) {
            console.log(`Could not load: ${name} API endpoints.`, ex.message);
        }
    });
}