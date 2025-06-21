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
  try {
    await connectMongoose();

    const skip = (page - 1) * limit;
    const filter = category ? { category } : {};

    // Check if we have any projects first
    const projectCount = await Project.countDocuments({});
    console.log('Total projects in database:', projectCount);

    if (projectCount === 0) {
      return {
        projects: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          currentPage: 1,
          totalPages: 0
        }
      };
    }

    const projects = await Project.find(filter)
      .populate('createdBy', 'id name email avatarUrl')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .maxTimeMS(30000); // 30 seconds timeout for this operation

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
  } catch (error) {
    console.error('Error fetching projects:', error);
    console.error('MongoDB connection state:', require('mongoose').connection.readyState);

    // Return empty result instead of throwing error
    return {
      projects: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        currentPage: 1,
        totalPages: 0
      }
    };
  }
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

export const getAllProjects = async (category?: string | null, endCursor?: string | null) => {
  try {
    await connectMongoose();

    const perPage = 8;
    let query: any = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    const totalCount = await Project.countDocuments(query);
    console.log(`Total projects in database: ${totalCount}`);

    let projects;
    if (endCursor) {
      projects = await Project.find({
        ...query,
        _id: { $lt: endCursor }
      })
        .populate('createdBy', 'id name email avatarUrl')
        .sort({ _id: -1 })
        .limit(perPage);
    } else {
      projects = await Project.find(query)
        .populate('createdBy', 'id name email avatarUrl')
        .sort({ _id: -1 })
        .limit(perPage);
    }

    const hasNextPage = projects.length === perPage;
    const endCursorNew = projects.length > 0 ? projects[projects.length - 1]._id : null;

    const edges = projects.map(project => ({
      node: {
        id: project._id.toString(),
        title: project.title,
        description: project.description,
        image: project.image,
        liveSiteUrl: project.liveSiteUrl,
        githubUrl: project.githubUrl,
        category: project.category,
        createdBy: {
          id: project.createdBy._id.toString(),
          name: project.createdBy.name,
          email: project.createdBy.email,
          avatarUrl: project.createdBy.avatarUrl
        }
      }
    }));

    return {
      projectSearch: {
        edges,
        pageInfo: {
          hasNextPage,
          hasPreviousPage: false,
          startCursor: edges.length > 0 ? edges[0].node.id : null,
          endCursor: endCursorNew?.toString() || null
        }
      }
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      projectSearch: {
        edges: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null
        }
      }
    };
  }
};