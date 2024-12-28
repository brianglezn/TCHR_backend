import express, { Request } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectDB } from './config/database';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Load environment variables before anything else
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Check the required environment variables
if (!process.env.CLERK_SECRET_KEY) {
    throw new Error("❌ CLERK_SECRET_KEY is missing");
}

if (!process.env.CLERK_PUBLISHABLE_KEY) {
    throw new Error("❌ CLERK_PUBLISHABLE_KEY is missing");
}

// Extend the Request interface to include auth.
declare global {
    namespace Express {
        interface Request {
            auth: {
                userId: string;
                sessionId: string;
            }
        }
    }
}

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Clerk Auth Middleware con opciones según la documentación
const authenticateRequest = ClerkExpressRequireAuth({
    authorizedParties: ['http://localhost:5173']
});

// Error handling middleware
app.use((err: any, req: Request, res: any, next: any) => {
    console.error('Error:', err);
    res.status(401).json({
        error: 'Unauthorized',
        message: err.message
    });
});

// Authentication middleware for all protected routes
app.use('/api', authenticateRequest);

// Protected test route
app.get('/api/test-auth', (req, res) => {
    try {
        res.json({
            message: 'Autenticación exitosa',
            userId: req.auth.userId,
            sessionId: req.auth.sessionId
        });
    } catch (error) {
        console.error('Error en /api/test-auth:', error);
        res.status(500).json({ error: 'Error en la autenticación' });
    }
});

// Start server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log('🚀 Server started:');
            console.log(`- Port: ${PORT}`);
            console.log(`- Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('❌ Error when starting the application:', error);
        process.exit(1);
    }
};

startServer(); 