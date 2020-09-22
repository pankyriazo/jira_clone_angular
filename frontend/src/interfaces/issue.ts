import { CommentI } from 'src/interfaces/comment';

export enum IssueList {
    TODO = 'TO DO',
    IN_PROGRESS = 'IN PROGRESS',
    CODE_REVIEW = 'CODE REVIEW',
    DONE = 'DONE'
}

export enum IssuePriority {
    LOWEST = 'Lowest',
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
    HIGHEST = 'Highest'
}

export const IssuePriorityIcons = {
    [IssuePriority.HIGHEST]: 'angle-double',
    [IssuePriority.HIGH]: 'angle-double',
    [IssuePriority.MEDIUM]: 'angle',
    [IssuePriority.LOW]: 'exclamation-circle',
    [IssuePriority.LOWEST]: 'exclamation-circle'
};

export const IssuePriorityColors = {
    [IssuePriority.HIGHEST]: '#FB0800',
    [IssuePriority.HIGH]: '#FCA502',
    [IssuePriority.MEDIUM]: '#FCA502',
    [IssuePriority.LOW]: '#FCA502',
    [IssuePriority.LOWEST]: '#999'
};

export enum IssueCategory {
    TASK = 'Task',
    BUG = 'Bug',
    WIKI = 'Wiki'
}

export const IssueCategoryIcons = {
    [IssueCategory.TASK]: 'tasks',
    [IssueCategory.BUG]: 'bug',
    [IssueCategory.WIKI]: 'file'
};

export const IssueCategoryColors = {
    [IssueCategory.TASK]: '#CD1317',
    [IssueCategory.BUG]: '#E97F33',
    [IssueCategory.WIKI]: '#57A55A'
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
