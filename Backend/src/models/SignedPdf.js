import {Schema, model} from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const SignedPdfSchema = new Schema({
    name: String,
    pdf: Buffer,
},
{
    versionKey: false,
    timestamps: true
});

SignedPdfSchema.plugin(mongoosePaginate);
export default model("SignedPdf", SignedPdfSchema);