import mongoose from "mongoose";
import { ObjectId } from 'mongodb';
const { Schema, model, Types } = mongoose;

const recordSchema = new mongoose.Schema(
  {
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    classe: {
      type: Number,
      required: true,
      trim: true,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
    },
    lelc: {
      type: String,
      required: true,
      trim: true,
    },
    ci: {
      type: String,
      required: true,
      trim: true,
    },
    policeof: {
      type: String,
      required: true,
      trim: true,
    },
    civilstatus: {
      type: String,
      required: true,
      trim: true,
    },
    domicile: {
      type: String,
      required: true,
      trim: true,
    },
    ministry: {
      type: String,
      required: true,
      trim: true,
    },
    distribution: {
      type: String,
      required: true,
      trim: true,
    },
    taskyouperform: {
      type: String,
      required: true,
      trim: true,
    },
    dateofadmission: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    orderno: {
      type: String,
      required: true,
      trim: true,
    },
    prescribingphysician: {
      type: String,
      required: true,
      trim: true,
    },
    days: {
      type: String,
      required: true,
      trim: true,
    },
    from: {
      type: String,
      required: true,
      trim: true,
    },
    until: {
      type: String,
      required: true,
      trim: true,
    },
    article: {
      type: String,
      required: true,
      trim: true,
    },
    diagnostic: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Esto debe coincidir con el nombre del modelo de usuario
    },
    files:  [{
      filename: String,
      bucketName: String,
      mimetype: String,
      encoding: String,
      id: Types.ObjectId
  }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Record", recordSchema);

