const mongoose = require("mongoose");

const connectToMongoDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};
module.exports = connectToMongoDB