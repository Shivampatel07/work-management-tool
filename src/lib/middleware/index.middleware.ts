import { connectDB } from "../db/connect";


// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const apiHandler = (handler: Function) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (req: Request, ...args: any) => {
        await connectDB(); // Ensure DB connection
        return handler(req, ...args); // Call the actual route handler
    };
};
