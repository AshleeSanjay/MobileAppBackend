import "dotenv/config";

export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const SERVER_PORT = process.env.PORT ?? "4000";
export const MONGO_CONNECTION_URI = process.env.MONGO_CONNECTION_URI ?? "";
export const IS_DEV = process.env.NODE_ENV !== "production";
