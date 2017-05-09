import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostSchema = new Schema({
  title: String,
  tags: String,
  content: String,
  cover_url: String,
  created_at: { type: Date, required: true, default: Date.now },
}, {
  toJSON: {
    virtuals: true,
  },
});


// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);


export default PostModel;
