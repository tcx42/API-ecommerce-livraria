export default interface IjwtPayload {
    name: string;
    email: string;
    role: "admin" | "client";
}
