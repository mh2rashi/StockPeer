import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    "Name": { type: String, required: true },
    "Closing Price": String,
    "Address": String,
    "Telephone": String,
    "Website": String,
    "Summary": String,
    "Sector(s)": String,
    "Industry": String,
    "Employees": String
  }, { toJSON: { getters: true } });

const ProfileModel = mongoose.model('Profile', ProfileSchema);

export default ProfileModel;