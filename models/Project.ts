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
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);