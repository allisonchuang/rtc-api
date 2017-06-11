import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// create a PostSchema with a title field
const ApplicantSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  firstName: String,
  lastName: String,
  school: String,
  year: String,
  major: String,
  gpa: String,
  languages: [],
  proficiencies: [],
  courses: String,
  github: String,
  linkedin: String,
  experience: String,
  extraCurriculars: String,
  preferredLocations: [],
  international: Boolean,
  references: String,
  phoneNumber: String,
  whyRTC: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

ApplicantSchema.pre('save', function beforeUserSave(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      return next();
    });
  });
  // user.password = hash;
  return null;
});

ApplicantSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (error, comparisonResult) => {
    if (error) return callback(error);
    else return callback(null, comparisonResult);
  });
};

// create UserModel class from schema
const ApplicantModel = mongoose.model('Applicant', ApplicantSchema);

export default ApplicantModel;
