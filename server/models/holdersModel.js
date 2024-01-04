import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const institutionalSchema = new Schema({
    Holders: [String],
    Shares: [String],
    Value: [String]
});

const HoldersSchema = new Schema({
    "Top Institutional Holders": institutionalSchema,
    "Top Mutual Fund Holders": institutionalSchema
}, { toJSON: { getters: true } });

const HoldersModel = mongoose.model('Holders', HoldersSchema);

export default HoldersModel;
