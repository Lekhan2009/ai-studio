
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  avatarUrl: string;
  description?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  projects: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatarUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 1000
  },
  githubUrl: {
    type: String
  },
  linkedinUrl: {
    type: String
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }]
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
import { Document, Model, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  avatarUrl: string;
  description?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  projects: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
  },
  avatarUrl: {
    type: String,
    required: [true, 'Avatar URL is required'],
  },
  description: {
    type: String,
    trim: true,
  },
  githubUrl: {
    type: String,
    trim: true,
  },
  linkedinUrl: {
    type: String,
    trim: true,
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }]
}, {
  timestamps: true,
});

const User: Model<IUser> = models?.User || model<IUser>('User', UserSchema);

export default User;
