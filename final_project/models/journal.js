const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const journalSchema = new Schema({
  city: String,
  geolocation:{
      latitude: Number,
      longitude: Number,
    },
  days: [],
},{ 
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


const Journal = mongoose.model("Journal", journalSchema);
module.exports = Journal;