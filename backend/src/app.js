import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import api from './routes/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const upload = multer({ dest: path.join(__dirname, 'uploads') });
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/api/health', (_req, res) => res.json({ ok: true, store: 'Kakal Kids Store' }));
app.post('/api/upload', upload.single('image'), (req, res) =>
  req.file
    ? res.status(201).json({ url: `/uploads/${req.file.filename}` })
    : res.status(400).json({ message: 'Envie uma imagem.' })
);
app.use('/api', api);
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Ops! Algo deu errado por aqui.' });
});
export default app;
