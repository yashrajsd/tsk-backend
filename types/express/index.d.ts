import { USER } from "../../lib/interface/models";

declare module 'express-serve-static-core' {
    interface Request {
        user?: USER
    }
}