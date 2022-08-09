import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import { Database } from './database/Database';

import { router } from "./routes";

const cors = require('cors');

const app = express();

const database = new Database();
database.connect();

app.use(express.json());
app.use(cors());
app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
        return response.status(400).json({
            error: error.message
        });
    }

    return response.status(500).json({
        error: "Internal Server Error"
    });
});

app.listen(process.env.PORT || 3333, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
