import { connect } from "mongoose";

const Db = async () => {
  try {
    const connection = await connect("mongodb://localhost:27017/screen_monitor");
    console.log("DATABASE CONNECTED");
    return connection;
  } catch (err) {
    console.log("DATABASE CONNECTION ERROR", err);
    process.exit(1);
  }
};

export default Db;
