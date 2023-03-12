const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyDataSchema = new Schema({
    date: Date,
    data: {
      users: [String]
    },
  },
  {timestamps: true}
  );

