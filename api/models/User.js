import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 160,
      unique: true,
    },
    password: {
      type: String,
      minlength: 4,
      maxlength: 1000,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
  // Timestamps will be used to show when something
  // in the user model is updated or changed.
);

export default mongoose.model('User', UserSchema);
