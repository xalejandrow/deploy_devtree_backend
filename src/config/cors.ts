import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        console.log('origin', origin);
        
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
        // if (process.env.ALLOWED_ORIGINS.split(',').includes(origin)) {
        //     callback(null, true);
        // } else {
        //     callback(new Error('Not allowed by CORS'));
        // }
    }
}