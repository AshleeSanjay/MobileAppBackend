import "dotenv/config";

export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const USER_SERVICE_PORT = process.env.USER_SERVICE_PORT ?? "3000";
export const MONGO_CONNECTION_URI = process.env.MONGO_CONNECTION_URI ?? "";
