import mongoose from 'mongoose';
import { compareSync, hashSync } from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        validate: {
            validator: user_id => User.doesNotExist({ user_id }),
            message: "Duplicate user id"
        },
        required: true
    },
    email: {
        type: String,
        validate: {
            validator: email => User.doesNotExist({ email }),
            message: "Email already exists"
        },
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Middleware for UserSchema
// Note: We cannot use arrow function for 3 methods below due to lexical scoping
UserSchema.pre('save', function () {
    if(this.isModified('password')) {
        this.password = hashSync(this.password, 10);
    }
});

UserSchema.statics.doesNotExist = async function (field) {
    return await this.where(field).countDocuments() === 0;
};

UserSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;