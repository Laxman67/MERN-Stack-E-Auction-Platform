import mongoose from 'mongoose';

export const DBConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: 'MERN_E_Auction_Platform' })
    .then(() => {
      console.log('DB Connected Successfully');
    })
    .catch((err) => {
      console.log(`Error Occured while DB Connecting ${err.message}`);
    });
};
