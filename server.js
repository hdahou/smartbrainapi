import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from'knex';

import register from './controllers/register.js';
import signin from './controllers/signin.js';
import profile from './controllers/profile.js';
import {image} from './controllers/image.js';
import {handleAPI} from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      port: 5432,
      password : 'Lucyfinnie123',
      database : 'smartbrain'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.json('success') })
app.post('/signin', (req, res) => { signin(req, res, db, bcrypt) })
app.post("/register", (req, res) => { register(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile((req, res, db)) })
app.put('/image', (req, res) => { image(req, res, db) })
app.post('/imageAPI', (req, res) => { handleAPI(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port ${process.env.PORT}')
});
