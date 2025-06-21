
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

export const fetchAllProjects = async (category?: string | null, endcursor?: string | null) => {
  try {
    // Convert endcursor to page number for our database function
    const page = endcursor ? parseInt(endcursor) || 1 : 1;
    const result = await getProjectsDB(category, page);
    return {
      projectSearch: {
        edges: result.projects.map((project: any) => ({ node: project })),
        pageInfo: {
          ...result.pageInfo,
          startCursor: page.toString(),
          endCursor: (page + 1).toString()
        }
      }
    };
  } catch (err) {
    throw err;
  }
};

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
  try {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      const project = await createProjectDB({
        ...form,
        image: imageUrl.url
      }, creatorId);

      return {
        projectCreate: {
          project
        }
      };
    }
  } catch (err) {
    throw err;
  }
};

export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {
  try {
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

    const project = await updateProjectDB(projectId, updatedForm);

    return {
      projectUpdate: {
        project
      }
    };
  } catch (err) {
    throw err;
  }
};

export const deleteProject = async (id: string, token: string) => {
  try {
    const result = await deleteProjectDB(id);
    return {
      projectDelete: result
    };
  } catch (err) {
    throw err;
  }
};

export const getProjectDetails = async (id: string) => {
  try {
    const project = await getProjectByIdDB(id);
    return { project };
  } catch (err) {
    throw err;
  }
};

export const createUser = async (name: string, email: string, avatarUrl: string) => {
  try {
    const user = await createUserDB(name, email, avatarUrl);
    return {
      userCreate: {
        user
      }
    };
  } catch (err) {
    throw err;
  }
};

export const getUserProjects = async (id: string, last?: number) => {
  try {
    const user = await getUserProjectsDB(id, last);
    return {
      user: {
        ...user?.toObject(),
        projects: {
          edges: user?.projects?.map((project: any) => ({ node: project })) || []
        }
      }
    };
  } catch (err) {
    throw err;
  }
};

export const getUser = async (email: string) => {
  try {
    const user = await getUserDB(email);
    return { user };
  } catch (err) {
    throw err;
  }
};
import { ProjectForm, ProjectInterface } from "@/common.types";
import { createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, updateProjectMutation } from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://localhost:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

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

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};

export const fetchAllProjects = async (category?: string | null, endCursor?: string | null) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(projectsQuery, { category, endCursor });
};

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      input: { 
        ...form, 
        image: imageUrl.url, 
        createdBy: { 
          link: creatorId 
        }
      }
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
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

  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: projectId,
    input: updatedForm,
  };

  return makeGraphQLRequest(updateProjectMutation, variables);
};

export const deleteProject = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const getProjectDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl
    },
  };
  
  return makeGraphQLRequest(createUserMutation, variables)
};

export const getUserProjects = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};
