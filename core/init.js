const Worker = require(`${global.config.root}/models/worker`);

module.exports = function() {
    Worker.findOne({name: 'Jesse Wheeler'}, {}, (err, worker) => {
        if (worker)
            return;

        Worker.create({name: 'Jesse Wheeler', companyName: 'Whlr Development', email: 'jesse@whlr.dev'}, (err, doc) => {
            console.log('Created worker Jesse Wheeler');
        });
    });
}