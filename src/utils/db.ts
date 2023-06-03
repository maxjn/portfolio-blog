import { connect, set, ConnectOptions } from "mongoose";

let isConnected: boolean = false;

const connectToDB = async () => {
  set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is connected");
    return;
  } else {
    try {
      await connect(process.env.MONGODB_URI!, {
        dbName: "PortfolioBlog",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.log(error);
    }
  }
};

export default connectToDB;
