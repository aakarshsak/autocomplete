import mongoose, { ConnectOptions } from "mongoose";

const LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/autocomplete";

export default (uri: string) => {
  const MONGO_URI = uri || LOCAL_MONGO_URI;

  console.log(uri, MONGO_URI);

  const options = {
    useCreateIndex: true,
  } as ConnectOptions;

  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to db..."))
    .catch((e) => console.log(e));
};
