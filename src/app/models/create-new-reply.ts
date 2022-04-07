

export class CreateNewReply {
	username: string | undefined;
    content: string | undefined;
    forumId: number | undefined;
	
    constructor(username?: string, content?: string, forumId?: number) {
        this.username = username;
        this.content = content;
        this.forumId =  forumId;
        
    }

	
}
