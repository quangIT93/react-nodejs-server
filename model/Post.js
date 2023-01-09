const mongoose = require('mongoose');

const schema = mongoose.Schema;

const postSchema = new schema({
    title: {
        type: String,
        // bat buoc phai nhap
        require: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    status: {
        type: String,
        enum: ['EXCELLENT', 'GOOD', 'BAD'],
    },
    user: {
        type: schema.Types.ObjectId,
        ref: 'users',
    },
});

module.exports = mongoose.model('posts', postSchema);
