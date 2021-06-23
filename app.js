const express = require('express');
const port = process.env.PORT || 3000;
const app  = express();

userRouter = require('./routes/userRoutes')();

app.use('/api/users', userRouter);

app.get('/api', (req, res) => {
    res.send('Hello from the API');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});