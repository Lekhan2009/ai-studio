import { ProjectForm } from "@/common.types";
import { 
  createProject as createProjectDB,
  updateProject as updateProjectDB,
  deleteProject as deleteProjectDB,
  createUser as createUserDB,
  getProjects as getProjectsDB,
  getProjectById as getProjectByIdDB,
  getUser as getUserDB,
  getUserProjects as getUserProjectsDB
} from "@/graphql";

const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({
        path: imagePath,
      }),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    const newProject = {
      ...form, 
      image: imageUrl.url, 
      createdBy: {
        link: creatorId
      }
    };

    return createProjectDB(newProject);
  }
};

export const fetchAllProjects = async (category?: string | null, endcursor?: string | null) => {
  return getProjectsDB(category, endcursor, 8);
};

export const getProjectDetails = async (id: string) => {
  return getProjectByIdDB(id);
};

export const getUserProjects = async (id: string, last?: number) => {
  return getUserProjectsDB(id, last);
};

export const deleteProject = async (id: string, token: string) => {
  return deleteProjectDB(id);
};

export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataURL(form.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  return updateProjectDB(updatedForm, projectId);
};

export const createUser = async (name: string, email: string, avatarUrl: string) => {
  return createUserDB({ name, email, avatarUrl });
};

export const getUser = async (email: string) => {
  return getUserDB(email);
};