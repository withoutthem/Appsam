const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyDataSchema = new Schema({
    date: String,
    data: {
      users: [String]
    },
  },
  {timestamps: true}
  );

  module.exports = mongoose.model('Daily', DailyDataSchema);