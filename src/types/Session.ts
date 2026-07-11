import { User } from "./User";

export interface Session {
    accessToken: string;
    user: {
        id: number;
        username: string;
        roleId: number;
    }
}