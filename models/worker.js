const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let workerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Worker', workerSchema);