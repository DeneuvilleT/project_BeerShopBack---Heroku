import default_session from './src/config/session.js';

import { mySession } from './src/config/session.js';
import router from './src/routes/index.js';
import session from 'express-session';
import express from 'express';
import cors from 'cors';


const PORT = process.env.PORT || process.env.SERVER_LOCAL_PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(mySession));
app.use(default_session);

app.use(router);


app.listen(PORT, () => {
   console.log(`Le serveur en ligne  port ${PORT}`);
});
