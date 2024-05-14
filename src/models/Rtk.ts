/*
|-----------------------------------------
| setting up Rtk for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: next-redux, May, 2024
|-----------------------------------------
*/

import mongoose, {Document, Schema} from 'mongoose';

export interface IRtk extends Document {
  name: string;
}

const RtkSchema: Schema = new Schema(
  {
    name: {type: String, required: true},
  },
  {timestamps: true},
);

const Rtk = mongoose.models.Rtk || mongoose.model<IRtk>('Rtk', RtkSchema);
export default Rtk;
