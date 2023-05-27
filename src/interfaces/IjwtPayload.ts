export default interface IjwtPayload {
  id: number;
  name: string;
  email: string;
  role: "admin" | "client";
  iat?: number;
  exp?: number;
}
