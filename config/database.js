const mongoose=require('mongoose');

require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(console.log("DB connection Successfully"))
    .catch((error) => {
        console.log("UNABLE TO CONNECT WITH DB");
        console.log(error);
    })
}