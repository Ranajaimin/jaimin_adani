const express = require('express')
const app = express()
const userController = require("./routes/index")
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/users', userController);
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port 3000`);
});


app.use((req, res, next) => {
    next(createError(404, 'Not Found'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});
