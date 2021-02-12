import mongoose from 'mongoose';

const StudySchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    user_id: Number,
    study_id: String,
    sutdy_instance_id: String,
    user: String,    
    status: String,
    labels: Object,
    remarks: String,
    timestamps: Object
}, { timestamps: true });

const Study = mongoose.model('Studies', StudySchema);
export default Study;
