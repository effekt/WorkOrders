const Worker = require(`${global.config.root}/models/worker`);
const WorkOrder = require(`${global.config.root}/models/workorder`);
const mongoose = require('mongoose');

module.exports = function(app) {
    const endpointName = `${global.config.api}/workorder`;

    app.post(endpointName, (req, res) => {
        req.body.deadline = new Date(req.body.deadline);
        let newWorkOrder = WorkOrder(req.body);
        newWorkOrder.save((err, doc) => {
            if (err) return global.util.res(res, false, err.message);
            global.util.res(res, true, `Work Order ${newWorkOrder.title} added.`, doc);
        });
    });

    app.get(endpointName, (req, res) => {
        WorkOrder.find({})
        .populate('workers')
        .sort('date')
        .exec((err, docs) => {
            if (err) return global.util.res(res, false, err.message);
            global.util.res(res, true, `Retrieved work orders.`, docs);
        });
    });

    app.patch(`${endpointName}/:workorder/:worker`, (req, res) => {
        Worker.findById(req.params.worker, (err, worker) => {
            if (err) return global.util.res(res, false, err.message);
            WorkOrder.findById(req.params.workorder, (err, doc) => {
                if (doc.workers.length >= 5) return global.util.res(res, false, 'Work order can only contain 5 workers.', doc);
                WorkOrder.findByIdAndUpdate(req.params.workorder, {$addToSet: {'workers': req.params.worker}}, {new: true}, (err, doc) => {
                    if (err) return global.util.res(res, false, err.message);
                    global.util.res(res, true, `Added ${worker.name} to work order ${doc.title}.`, doc);
                });
            });
        });
    });

    app.get(`${endpointName}/worker/:worker`, (req, res) => {
        Worker.findById(req.params.worker, (err, worker) => {
            if (err) return global.util.res(res, false, err.message);
            WorkOrder.find({'workers': mongoose.Types.ObjectId(req.params.worker)})
            .sort('date')
            .populate('workers', )
            .exec((err, docs) => {
                if (err) return global.util.res(res, false, err.message);
                if (!docs.length) return global.util.res(res, true, `No work orders found for ${worker.name}.`, []);
                global.util.res(res, true, `Retrieved work orders for ${worker.name}.`, docs);
            });
        });
    });
}