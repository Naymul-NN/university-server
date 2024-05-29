

export type Tuser = {
    id: string;
    password: string;
    needsPsswordChange: boolean;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;

}

