const mongoose = require("mongoose");

require("dotenv").config({path: 'variables.env'});

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("db connect");
    }catch(error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;