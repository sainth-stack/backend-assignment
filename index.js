import cors from 'cors';
import express from 'express';
import demoRoutes from './routes/demoRoutes.js'
import db from './config/db.js'
const app = express();
const port = 4000;

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '50mb' }));


app.use('/api',demoRoutes)
app.listen(port, async() => {
    await db.connect();
    console.log(`Server running on port ${port}`);
});