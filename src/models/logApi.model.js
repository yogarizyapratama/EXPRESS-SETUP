import mongoose from "mongoose";

const logApiSchema = new mongoose.Schema({
  method: String,
  path: String,
  timestamp: { type: Date, default: Date.now },
  cpuUsage: Number,
});

const logAPIModel = mongoose.model("logAPI", logApiSchema);
export default logAPIModel;
