import { UsersModel } from "../users/Users.model";

export interface MoviesUserLikeModel {
    id?: string;
    user?: UsersModel;
    usersId: string
    movieID: string;
}