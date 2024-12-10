const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI)
    .then((con)=>console.log(`MongoDB connected to host: ${con.connection.host}`))
    // .catch((err)=>console.log('DB error!',err))
}

module.exports = connectDatabase