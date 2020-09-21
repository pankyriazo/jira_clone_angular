import { IssueI } from 'src/interfaces/issue';
import { UserI } from 'src/interfaces/user';

export enum ProjectCategory {
    SOFTWARE = 'Software',
    MARKETING = 'Marketing',
    HR = 'Human Resources'
}

export interface ProjectI {
    id: string;
    name: string;
    url: string;
    description: string;
    category: ProjectCategory;
    createdAt: string;
    updateAt: string;
    users: UserI[];
    issues: IssueI[];
}
