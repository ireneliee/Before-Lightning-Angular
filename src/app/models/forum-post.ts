import { Member } from "./member";
import { Reply } from "./reply";

export class ForumPost {
	forumPostEntityId: number | undefined;
	title: string | undefined;
	content: string | undefined;
	image: string | undefined;
	timestamp: Date | undefined;
	visible: boolean | undefined;
	banned: boolean | undefined;

	replyEntities: Reply[] | undefined;
	listOfMemberLikes: Member[] | undefined;
	listOfMemberDislikes: Member[] | undefined;
    forumAuthor : Member | undefined;


	constructor(forumPostEntityId?: number, forumAuthor?: Member, title?: string, 
		content?: string, image?: string, timestamp?: Date, 
		visible?: boolean, banned?: boolean, replyEntities?: Reply[], listOfMemberLikes?: Member[],
		listOfMemberDislikes?: Member[]) {
		this.forumPostEntityId = forumPostEntityId;
		this.forumAuthor = forumAuthor;
		this.title = title;
		this.content = content;
		this.timestamp = timestamp;
		this.visible = visible;
		this.banned = banned;
		this.image = image;
		this.replyEntities = replyEntities;
		this.listOfMemberLikes = listOfMemberLikes;
		this.listOfMemberDislikes = listOfMemberDislikes;

	}
}
