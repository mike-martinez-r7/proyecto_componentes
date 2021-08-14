const express = require('express');
var cors      = require('cors')
userRouter    = require('./routes/userRoutes')();
companyRouter = require('./routes/companyRoutes')();

const port = process.env.PORT || 3000;
const app  = express();

app.use(cors())
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/companies', companyRouter);

app.get('/api', (req, res) => {
    res.send('Hello from the API');
});

app.listen(port, () => {
    console.log(`Boyata API running on port ${port}`);
});