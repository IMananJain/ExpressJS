import express from 'express';
import envConfig from './config/envConfig';
import connectDB from './db/connection';
import authRoutes from './features/auth/routes';
import cors from "cors";
import eventRoutes from './features/event/routes';

const app = express();
const env = envConfig();
const port = env.port;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/event', eventRoutes);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running at http://localhost:${port}`);
});
