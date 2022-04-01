

export class UpdateForumPost {
	username: string | undefined;
    content: string | undefined;
    visibility: boolean | undefined;
    forumPostId: number | undefined;
	
    constructor(username?: string, content?: string, visibility?: boolean, forumPostId?: number) {
        this.username = username;
        this.content = content;
        this.visibility = visibility;
        this.forumPostId = forumPostId;
        
    }

	
}
