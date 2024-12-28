import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI?.replace(
    '<MONGO_USER>',
    process.env.MONGO_USER || ''
).replace(
    '<MONGO_PASSWORD>',
    process.env.MONGO_PASSWORD || ''
);

if (!MONGODB_URI) {
    throw new Error('❌ Please define MONGODB_URI in the .env file');
}

console.log('🔄 Trying to connect to MongoDB...');

export async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI as string, {
            maxPoolSize: 10,
            minPoolSize: 5,
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 5000,
        });

        console.log('✅ Successfully connected to MongoDB');

        mongoose.connection.on('connected', () => {
            console.log('🔄 Reconnected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected');
        });

        const gracefulShutdown = async (msg: string) => {
            try {
                await mongoose.connection.close();
                console.log(`✅ MongoDB connection closed due to ${msg}`);
                process.exit(0);
            } catch (err) {
                console.error('❌ Error closing MongoDB connection:', err);
                process.exit(1);
            }
        };

        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));

    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        throw error;
    }
}