import mongoose from "mongoose";

export const ConnectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect('mongodb://amrendrayadav1305_db_user:Amrendra%402004@ac-svqx7gm-shard-00-00.erizacg.mongodb.net:27017,ac-svqx7gm-shard-00-01.erizacg.mongodb.net:27017,ac-svqx7gm-shard-00-02.erizacg.mongodb.net:27017/todo-app?ssl=true&replicaSet=atlas-4y7zn6-shard-0&authSource=admin&retryWrites=true&w=majority');
        console.log("DB connected successfully");
    } catch (error) {
        console.error("Mongoose connection error:", error.message);
        throw error;
    }
}


