import { CommentI } from 'src/interfaces/comment';

export enum IssueList {
    TODO = 'TODO',
    IN_PROGRESS = 'IN PROGRESS',
    CODE_REVIEW = 'CODE REVIEW',
    DONE = 'DONE'
}

export enum IssueCategory {
    TASK = 'Task',
    BUG = 'Bug',
    WIKI = 'Wiki'
}

export enum IssuePriority {
    LOWEST = 'Lowest',
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
    HIGHEST = 'Highest'
}

export const IssuePriorityColors = {
    [IssuePriority.HIGHEST]: '#CD1317',
    [IssuePriority.HIGH]: '#E9494A',
    [IssuePriority.MEDIUM]: '#E97F33',
    [IssuePriority.LOW]: '#2D8738',
    [IssuePriority.LOWEST]: '#57A55A'
};

export interface IssueI {
    id: string;
    list: IssueList;
    category: IssueCategory;
    listPosition: number;
    priority: IssuePriority;
    title: string;
    description: string;
    estimate: number;
    timeSpent: number;
    timeRemaining: number;
    createdAt: string;
    updatedAt: string;
    reporterId: string;
    userIds: string[];
    comments: CommentI[];
}
