const express  = require('express');
const cors     = require('cors')
userRouter     = require('./routes/userRoutes')();
companyRouter  = require('./routes/companyRoutes')();
activityRouter = require('./routes/activityRoutes')();

const port = process.env.PORT || 3000;
const app  = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/companies', companyRouter);
app.use('/api/activities', activityRouter);

app.get('/api', (req, res) => {
  res.send('Hello from the API');
});

app.listen(port, () => {
  console.log(`Boyata API running on port ${port}`);
});