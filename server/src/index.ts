import express from 'express';
import cors from 'cors';
import ipRoutes from './routes/ipRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', ipRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
