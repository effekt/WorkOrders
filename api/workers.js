const Worker = require(`${global.config.root}/models/worker`);

module.exports = function(app) {
    const endpointName = `${global.config.api}/worker`;

    app.post(endpointName, (req, res) => {
        let newWorker = Worker(req.body);
        newWorker.save((err, doc) => {
            if (err) return global.util.res(res, false, err.message);
            global.util.res(res, true, `Worker ${newWorker.name} added.`, doc);
        });
    });

    app.delete(`${endpointName}/:worker`, (req, res) => {
        Worker.findByIdAndRemove(req.params.worker, (err, doc) => {
            if (err) return global.util.res(res, false, err.message);
            global.util.res(res, true, `Worker ${doc.name} removed.`, doc);
        });
    });

    app.get(endpointName, (req, res) => {
        Worker.find({}, (err, docs) => {
            if (err) return global.util.res(res, false, err.message);
            global.util.res(res, true, 'Retrieved all workers.', docs);
        })
    });
}