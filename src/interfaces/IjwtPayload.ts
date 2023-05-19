export default interface IjwtPayload {
  name: string;
  email: string;
  role: "admin" | "client";
  iat?: number;
  exp?: number;
}
