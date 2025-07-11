// common.types.ts

import { User, Session } from 'next-auth';

export interface FormState {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}

export interface ProjectInterface {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  _id: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    _id: string;
    id: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  createdBy?: string;
}

export interface UserProfile {
  _id: string;
  id: string;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  projects: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    avatarUrl: string;
  };
}

export interface ProjectSearch {
  projects: ProjectInterface[];
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string;
    endCursor: string | null;
  };
}
