import mongoose from "mongoose";
require('dotenv').config();

class Database {
    connect() {
        mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_DOMAIN}/myFirstDatabase?retryWrites=true&w=majority`);
    }
}

export { Database };
