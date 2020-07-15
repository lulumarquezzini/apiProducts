const express = require('express');
const cors = require('cors');
const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const productRoutes = require('./src/routes/productRoute');

app.use('/api/v1', productRoutes);


const port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});