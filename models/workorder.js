const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const workOrderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    workers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' }]
}, { timestamps: true });

module.exports = mongoose.model('WorkOrder', workOrderSchema);