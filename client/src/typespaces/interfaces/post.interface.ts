import { User } from "./user.interface.ts";

export interface Post {
    caption: string;
    id: string;
    date: string;
    comments: number;
    likes: number;
    permalink: string;
    userId: string;
    user: User;
}
