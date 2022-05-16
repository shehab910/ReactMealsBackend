export enum permission {
   ADMIN = "ADMIN",
   USER = "USER",
}

interface IUser {
   username: string;
   email: string;
   password: string;
   permission: permission;
}
export default IUser;
