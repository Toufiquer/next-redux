/*
|-----------------------------------------
| setting up Post for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: next-redux, May, 2024
|-----------------------------------------
*/

import mongoose, {Document, Schema} from 'mongoose';

export interface IPost extends Document {
  name: string;
  price?: number;
  description?: string;
}

const PostSchema: Schema = new mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: false},
  description: {type: String, required: false},
});

const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
export default Post;
