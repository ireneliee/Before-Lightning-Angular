import { ForumPost } from "./forum-post";

export class CreateForumReq {
    username: string | undefined;
    password: string | undefined;
    forumPost: ForumPost | undefined;

    constructor(username?: string, password?: string, forumPost?: ForumPost) {
        this.username = username;
        this.password = password;
        this.forumPost = forumPost;
    }
    
}