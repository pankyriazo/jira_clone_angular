import { CommentI } from 'src/interfaces/comment';

export class Comment implements CommentI {
    public issueID: string;
    public userID: string;
    public id: string;
    public body: string;
    public createdAt: string;
    public updatedAt: string;

    constructor(issueID: string, userID: string, id: string, body: string, createdAt: string, updatedAt: string) {
        this.issueID = issueID;
        this.userID = userID;
        this.id = id;
        this.body = body;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
