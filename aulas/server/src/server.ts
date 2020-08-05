import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

// Express não entende o JSON por isso precisamos...
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);