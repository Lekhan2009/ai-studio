
import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  createdBy: mongoose.Types.ObjectId;
}

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  liveSiteUrl: {
    type: String,
    required: true
  },
  githubUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
import { Document, Model, Schema, model, models } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  createdBy: Schema.Types.ObjectId;
}

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  liveSiteUrl: {
    type: String,
    required: [true, 'Live site URL is required'],
    trim: true,
  },
  githubUrl: {
    type: String,
    required: [true, 'GitHub URL is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator is required'],
  },
}, {
  timestamps: true,
});

const Project: Model<IProject> = models?.Project || model<IProject>('Project', ProjectSchema);

export default Project;
