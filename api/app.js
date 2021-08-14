const express = require('express');
userRouter    = require('./routes/userRoutes')();
companyRouter = require('./routes/companyRoutes')();

const port = process.env.PORT || 3000;
const app  = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Length, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/companies', companyRouter);

app.get('/api', (req, res) => {
    res.send('Hello from the API');
});

app.listen(port, () => {
    console.log(`Boyata API running on port ${port}`);
});