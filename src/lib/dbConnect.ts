import mongoose, { Connection } from "mongoose";

const DATABASE_URL: string | undefined = process.env.MONGODB_URI;
const ACCOUNTS_DB_NAME: string | undefined = process.env.ACCOUNTS_DB_NAME;
const BLOG_DB_NAME: string | undefined = process.env.BLOG_DB_NAME;

// Checking the environment variables for database configuration.
if (!DATABASE_URL || !ACCOUNTS_DB_NAME || !BLOG_DB_NAME)
    throw new Error("Please make sure you define the database environment variable (DATABASE_URL, ACCOUNTS_DB_NAME, BLOG_DB_NAME) inside .env");

// Declaration of global namespace for caching the database connection.
declare global {
    var mongoose: {
        [key: string]: Promise<mongoose.Mongoose> | null
    };
}

/**
 * Caching object for the database connection.
 */
let cached = global.mongoose;

// Initialization of the caching object.
if (!cached) {
    cached = global.mongoose = {};
}

/**
 * @description This function is used to connect to the database. 
 * The function helps to create multiple db connections and cache them.
 * @param uri 
 * @param dbName 
 * @returns Connection 
 */
function makeNewConnection(uri: string, dbName: string): Promise<mongoose.Mongoose> {
    if (cached && cached[dbName]) {
        console.log(`Already connected to the database ${dbName}`);
        return cached[dbName];
    }

    try {
        cached[dbName] = mongoose.connect(uri, {
            bufferCommands: false,
            dbName
        });
    } catch (error) {
        console.error(`Could not connect to the database ${dbName} ${JSON.stringify(error)}`);
        // Graceful exit in case of a connection error
        process.exit(1);
    }

    return cached[dbName];
}

export const accountsConnection = makeNewConnection(DATABASE_URL, ACCOUNTS_DB_NAME);
export const blogConnection = makeNewConnection(DATABASE_URL, BLOG_DB_NAME);

// module.exports = {
//     accountsConnection,
//     blogConnection,
// };
