export interface SessionInterface {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
}
