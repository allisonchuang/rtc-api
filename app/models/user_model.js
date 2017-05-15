import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// create a PostSchema with a title field
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  username: String,
  profile: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

UserSchema.pre('save', function beforeUserSave(next) {
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

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (error, comparisonResult) => {
    if (error) return callback(error);
    else return callback(null, comparisonResult);
  });
};

// create UserModel class from schema
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
