const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, unique: true, trim: true, required: true },
        email: { type: String, unique: true, required: true, match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],},
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],      
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// create virutal property friendCount that gets and sets the user's friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;