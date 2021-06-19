const express = require('express');
const port = process.env.port || 3000;
const app  = express();

//const db = mongoose.connect('mongodb://localhost/carshop')
userRouter = require('./routes/userRoutes')();

//app.use(bodyParser.json);
app.use('/api/users', userRouter);

app.get('/api', (req, res) => {
    res.send('Hello from the API');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});