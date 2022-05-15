export enum permission {
   ADMIN = "ADMIN",
   USER = "USER",
}

interface IUser {
   username: string;
   password: string;
   permission: permission;
}
export default IUser;
