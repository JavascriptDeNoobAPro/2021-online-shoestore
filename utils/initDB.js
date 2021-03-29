import mongoose from "mongoose";

const initDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("connected to Mongo");
  });
  mongoose.connection.on("error", (err) => {
    console.log("error connecting", err);
  });
};

export default initDB;
