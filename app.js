const express = require('express');
const app  = express();
app.set('port', (process.env.PORT || 5000));

userRouter = require('./routes/userRoutes')();

app.use('/api/users', userRouter);

app.get('/api', (req, res) => {
    res.send('Hello from the API');
});

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port') + '/');
});