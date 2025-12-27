import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(compression());

app.get('/health', (_req, res) => {
	res.send('Uniblox backend running 🚀');
});

export default app;
