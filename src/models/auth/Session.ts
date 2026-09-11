export interface Session {
  accessToken: string;
  user: {
    id: number;
    permissions: Permissions[];
    username: string;
  }
}

interface Permissions {
  id: number;
  permission: string;
}