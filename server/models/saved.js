import { model, Schema } from "mongoose";


const savedSchema = new Schema({
    createdAt: { type: Date, default: new Date() }
});


export default model("SavedWeather", savedSchema);