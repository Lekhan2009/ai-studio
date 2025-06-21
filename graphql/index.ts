import { connectMongoose } from "@/lib/mongodb";
import Project from "@/models/Project";
import User from "@/models/User";

export const getProjects = async (category?: string, endCursor?: string) => {
  try {
    await connectMongoose();

    let query = {};
    if (category && category !== 'All') {
      query = { category };
    }

    const limit = 8;
    let projectQuery = Project.find(query).populate('createdBy').sort({ createdAt: -1 });

    if (endCursor) {
      projectQuery = projectQuery.skip(parseInt(endCursor));
    }

    const projects = await projectQuery.limit(limit);
    const totalProjects = await Project.countDocuments(query);

    const hasNextPage = parseInt(endCursor || '0') + limit < totalProjects;
    const hasPreviousPage = parseInt(endCursor || '0') > 0;

    return {
      projects: projects.map(project => ({
        ...project.toObject(),
        id: project._id.toString(),
        createdBy: {
          ...project.createdBy.toObject(),
          id: project.createdBy._id.toString()
        }
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor: endCursor || '0',
        endCursor: hasNextPage ? (parseInt(endCursor || '0') + limit).toString() : null
      }
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      projects: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: '0',
        endCursor: null
      }
    };
  }
};

export const getProjectById = async (id: string) => {
  try {
    await connectMongoose();
    const project = await Project.findById(id).populate('createdBy');

    if (!project) return null;

    return {
      ...project.toObject(),
      id: project._id.toString(),
      createdBy: {
        ...project.createdBy.toObject(),
        id: project.createdBy._id.toString()
      }
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

export const getProjectsOfUser = async (id: string, last?: number) => {
  try {
    await connectMongoose();
    const projects = await Project.find({ createdBy: id })
      .populate('createdBy')
      .sort({ createdAt: -1 })
      .limit(last || 4);

    return {
      projects: projects.map(project => ({
        ...project.toObject(),
        id: project._id.toString(),
        createdBy: {
          ...project.createdBy.toObject(),
          id: project.createdBy._id.toString()
        }
      }))
    };
  } catch (error) {
    console.error('Error fetching user projects:', error);
    return { projects: [] };
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectMongoose();
    const user = await User.findById(id).populate('projects');

    if (!user) return null;

    return {
      ...user.toObject(),
      id: user._id.toString()
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};