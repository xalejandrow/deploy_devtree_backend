import { CorsOptions } from "cors";

// console.log(process.argv);

export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        // console.log('origin', origin);
        const whiteList = [process.env.FRONTEND_URL];

        if(process.argv[2] === '--api') {
            whiteList.push(undefined); // Allow requests from Postman
        }


        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
        // if (origin === process.env.FRONTEND_URL) {
        //     callback(null, true);
        // } else {
        //     callback(new Error('Not allowed by CORS'));
        // }

        // if (process.env.ALLOWED_ORIGINS.split(',').includes(origin)) {
        //     callback(null, true);
        // } else {
        //     callback(new Error('Not allowed by CORS'));
        // }
    }
}