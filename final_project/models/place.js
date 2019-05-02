const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
  geolocation:{
    latitude: Number,
    longitude: Number,
    },
  rating: Number,
  hours: String,
  description: String,
  comments: [],
},{ 
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


const Place = mongoose.model("Place", placeSchema);
module.exports = Place;