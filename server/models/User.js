const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
    },

    github: {
        type: String,
        required: true,
        trim: true
    },

    picture: {
        type: String,
    },

    bio: {
        type: String,
    },

    joinedProjects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],

    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],

},
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;