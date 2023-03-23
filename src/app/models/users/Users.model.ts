export interface UsersModel {
    id: string;
    email: string;
    name_user: string;
    password: string;
    salt: string;
    errorPassword: number;
}