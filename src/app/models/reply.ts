import { ForumPost } from "./forum-post";
import { Member } from "./member";

export class Reply {
	replyEntityId: number | undefined;
	content: string | undefined;
	image: string | undefined;
	timestamp: Date | undefined;
	visible: boolean | undefined;
	banned: boolean | undefined;

	forumPostEntity: ForumPost | undefined;
	memberEntity: Member | undefined;

	constructor(replyEntityId?: number, content?: string, image?: string, timestamp?: Date, visible?: boolean, banned?: boolean) {
		this.replyEntityId = replyEntityId;
		this.content = content;
		this.image = image;
		this.timestamp = timestamp;
		this.visible = visible;
		this.banned = banned;
	}
}
