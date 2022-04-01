import { ForumPost } from "./forum-post";
import { Member } from "./member";

export class Reply {
	replyEntityId: number | undefined;
	content: string | undefined;
	imageLink: string | undefined;
	timestamp: Date | undefined;
	isVisible: boolean | undefined;
	isBanned: boolean | undefined;

	forumPost: ForumPost | undefined;
	author: Member | undefined;

	constructor(replyEntityId?: number, author?: Member, content?: string, 
		imageLink?: string, timestamp?: Date, isVisible?: boolean, isBanned?: boolean) {
		this.replyEntityId = replyEntityId;
		this.content = content;
		this.imageLink = imageLink;
		this.timestamp = timestamp;
		this.isVisible = isVisible;
		this.isBanned = isBanned;
		this.author = author;
	}
}
