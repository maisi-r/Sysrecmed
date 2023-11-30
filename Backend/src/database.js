import mongoose from 'mongoose';

// mongoose.set('strictQuery', false);

// mongoose.connect("mongodb://127.0.0.1/Sysrecmedicos", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(db => console.log('Db is connected'))
//   .catch(error => console.log(error));

export const connectDB = async () => {
try {
  await mongoose.connect ("mongodb://127.0.0.1/Sysrecmedicos")
  console.log("DB is connected")
} catch (error) {
  console.log(error)
  
}
}