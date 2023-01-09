const mongoose = require('mongoose');

const { MongoClient, ServerApiVersion } = require('mongoDB');
mongoose.set('strictQuery', false);
async function connectDB() {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@project-mern.vrrdmlq.mongodb.net/project-mern?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1,

                // hai cai ben duoi da khong con ho tro
                // options usecreateindex, usefindandmodify are not supported
                // useCreateIndex: true,
                // useFindAndModify: false,
            }
        );
        console.log('connected mongooseDB!!!');
    } catch (error) {
        console.log('ket noi that bai');
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = { connectDB };
