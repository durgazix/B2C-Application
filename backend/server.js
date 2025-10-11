import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './cofig/db.js';
import authRoutes from './routes/authRoutes.js';
import requirementRoutes from './routes/requirementRoutes.js';
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import superAdminRoutes from './routes/superAdminRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/requirements", requirementRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/superadmin", superAdminRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));