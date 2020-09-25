export enum IssueList {
    TODO = 'TO DO',
    IN_PROGRESS = 'IN PROGRESS',
    CODE_REVIEW = 'CODE REVIEW',
    DONE = 'DONE'
}

export enum IssuePriority {
    HIGHEST = 'Highest',
    HIGH = 'High',
    MEDIUM = 'Medium',
    LOW = 'Low',
    LOWEST = 'Lowest'
}

export const IssuePriorityIcons = {
    [IssuePriority.HIGHEST]: 'angle-double',
    [IssuePriority.HIGH]: 'angle-double',
    [IssuePriority.MEDIUM]: 'angle',
    [IssuePriority.LOW]: 'angle',
    [IssuePriority.LOWEST]: 'exclamation-circle'
};

export const IssuePriorityColors = {
    [IssuePriority.HIGHEST]: '#FB0800',
    [IssuePriority.HIGH]: '#FCA502',
    [IssuePriority.MEDIUM]: '#FCA502',
    [IssuePriority.LOW]: '#999',
    [IssuePriority.LOWEST]: '#999'
};

export enum IssueCategory {
    TASK = 'Task',
    BUG = 'Bug',
    STORY = 'Story'
}

export const IssueCategoryIcons = {
    [IssueCategory.TASK]: 'tasks',
    [IssueCategory.BUG]: 'dot-circle',
    [IssueCategory.STORY]: 'book'
};

export const IssueCategoryColors = {
    [IssueCategory.TASK]: '#569924',
    [IssueCategory.BUG]: '#ff0000',
    [IssueCategory.STORY]: '#007dff'
};

export interface IssueI {
    id: string;
    list: IssueList;
    category: IssueCategory;
    listPosition: number;
    priority: IssuePriority;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    reporterId: string;
    userIds: string[];
}

