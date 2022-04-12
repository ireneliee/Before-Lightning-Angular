import { Member } from "./member";
import { Reply } from "./reply";

export class ForumPost {
	forumPostEntityId: number | undefined;
	title: string | undefined;
	content: string | undefined;
	imageLink: string | undefined;
	timestamp: Date | undefined;
	isVisible: boolean | undefined;
	isBanned: boolean | undefined;

	replies: Reply[] | undefined;
	userWhoLikes: Member[] | undefined;
    author : Member | undefined;


	constructor(forumPostEntityId?: number, author?: Member, title?: string, 
		content?: string, imageLink?: string, timestamp?: Date, 
		isVisible?: boolean, isBanned?: boolean, replies?: Reply[], userWhoLikes?: Member[],
		userWhoDislikes?: Member[]) {
		this.forumPostEntityId = forumPostEntityId;
		this.author = author
		this.title = title;
		this.content = content;
		this.timestamp = timestamp;
		this.isVisible = isVisible;
		this.isBanned = isBanned;
		this.imageLink = imageLink;
		this.replies = replies;
		this.userWhoLikes = userWhoLikes;

	}
}
