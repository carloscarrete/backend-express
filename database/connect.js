const mongoose = require('mongoose');

const dbConnection = async () =>{
  try{
    await mongoose.connect(process.env.URL_MONGO);
    console.log('Done!');
  }catch(error){
    console.log(error);
  }
}

module.exports = {dbConnection};
