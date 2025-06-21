
import { connectMongoose } from '@/lib/mongodb';
import User, { IUser } from '@/models/User';
import Project, { IProject } from '@/models/Project';
import { ProjectForm } from '@/common.types';

export const createProject = async (projectData: ProjectForm, userId: string) => {
  await connectMongoose();
  
  const newProject = new Project({
    ...projectData,
    createdBy: userId
  });
  
  const savedProject = await newProject.save();
  await savedProject.populate('createdBy', 'name email avatarUrl');
  
  // Add project to user's projects array
  await User.findByIdAndUpdate(userId, {
    $push: { projects: savedProject._id }
  });
  
  return savedProject;
};

export const updateProject = async (projectId: string, projectData: Partial<ProjectForm>) => {
  await connectMongoose();
  
  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    projectData,
    { new: true }
  ).populate('createdBy', 'name email avatarUrl');
  
  return updatedProject;
};

export const deleteProject = async (projectId: string) => {
  await connectMongoose();
  
  const project = await Project.findById(projectId);
  if (!project) throw new Error('Project not found');
  
  // Remove project from user's projects array
  await User.findByIdAndUpdate(project.createdBy, {
    $pull: { projects: projectId }
  });
  
  await Project.findByIdAndDelete(projectId);
  return { deletedId: projectId };
};

export const createUser = async (name: string, email: string, avatarUrl: string) => {
  await connectMongoose();
  
  const newUser = new User({
    name,
    email,
    avatarUrl
  });
  
  const savedUser = await newUser.save();
  return savedUser;
};

export const getProjects = async (category?: string | null, page: number = 1, limit: number = 8) => {
  await connectMongoose();
  
  const skip = (page - 1) * limit;
  const filter = category ? { category } : {};
  
  const projects = await Project.find(filter)
    .populate('createdBy', 'id name email avatarUrl')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  
  const total = await Project.countDocuments(filter);
  const hasNextPage = skip + limit < total;
  const hasPreviousPage = page > 1;
  
  return {
    projects,
    pageInfo: {
      hasNextPage,
      hasPreviousPage,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getProjectById = async (id: string) => {
  await connectMongoose();
  
  const project = await Project.findById(id)
    .populate('createdBy', 'id name email avatarUrl');
  
  return project;
};

export const getUser = async (email: string) => {
  await connectMongoose();
  
  const user = await User.findOne({ email });
  return user;
};

export const getUserById = async (id: string) => {
  await connectMongoose();
  
  const user = await User.findById(id);
  return user;
};

export const getUserProjects = async (userId: string, limit: number = 4) => {
  await connectMongoose();
  
  const user = await User.findById(userId)
    .populate({
      path: 'projects',
      options: { 
        sort: { createdAt: -1 },
        limit: limit
      },
      select: 'id title image'
    });
  
  return user;
};
