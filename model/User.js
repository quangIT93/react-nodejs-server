const mongoose = require('mongoose');

const schema = mongoose.Schema;

const UserSchema = new schema(
    {
        username: {
            type: String,
            // bat buoc phai nhap
            require: true,
            // khong ai co username giong nhau
            unique: true,
        },
        password: {
            type: String,
            // bat buoc phai nhap
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('users', UserSchema);
