import mongoose from 'mongoose';

const StudySchema = new mongoose.Schema({
    _id: String,
    user_id: Number,
    study_id: String,
    user: String,
    read_order: String,
    status: Object,
    labels: Object,
    remarks: String,
    timestamps: Object
}, { timestamps: true });

const Study = mongoose.model('Studies', StudySchema);
export default Study;
