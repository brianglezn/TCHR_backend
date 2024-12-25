import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Clerk Auth Middleware
const authenticateRequest = ClerkExpressRequireAuth({});

// Rutas protegidas ejemplo
app.get('/api/protected', authenticateRequest, (req, res) => {
  res.json({ message: 'Ruta protegida' });
});

// Iniciar servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}); 