import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const HistoricalSchema = new Schema({
  dates: [String],
  highPrices: [String],
  lowPrices: [String],
  closingPrices: [String]
}, { toJSON: { getters: true } });

const HistoricalModel = mongoose.model('Historical', HistoricalSchema);

export default HistoricalModel;
