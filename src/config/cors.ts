import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        console.log('origin', origin);
        
        if (origin === 'http://localhost:5173') {
            // console.log('Permitir Conexión');
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