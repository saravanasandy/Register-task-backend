const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
  'https://register-task-frontend.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

const connectDB = require('./db/connect');
const authenticateUser = require('./Middleware/authentication');

app.use(express.json());

const authRouter = require('./routes/auth');
const registerRouter = require('./routes/registerDetails');

app.get('/', (req, res) => {
  res.send('testing');
});

app.use('/auth', authRouter);
app.use('/details', authenticateUser, registerRouter);

const port = process.env.PORT || 5000;

const server = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

server();
