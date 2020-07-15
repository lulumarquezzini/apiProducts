const express = require('express');
const cors = require('cors');
const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const productRoutes = require('./src/routes/productRoute');

// MULTER
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})

app.post('/api/v1/upload', (req, res, next) => {
    const upload = multer({ storage }).single('name-of-input-key')
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      res.json(req.file)
    })
})

app.use('/api/v1', productRoutes);


const port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});