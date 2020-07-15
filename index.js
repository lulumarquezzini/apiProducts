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
      console.log("Image uploaded to server")

        // SEND FILE TO CLOUDINARY
        const cloudinary = require('cloudinary').v2
        cloudinary.config({
            cloud_name: 'dsc0yzyxi',
            api_key: '623475362488624',
            api_secret: 'syRm_WAJ4iMFh3IbGEG0GUmF-Ss'
        })

        const path = req.file.path
        const uniqueFilename = new Date().toISOString()

        cloudinary.uploader.upload(
        path,
        { public_id: `products/${uniqueFilename}`, tags: 'product' }, // directory and tags are optional
        function(err, image) {
            if (err) return res.send(err)
            console.log('file uploaded to Cloudinary')
            // remove file from server
            const fs = require('fs')
            fs.unlinkSync(path)
            // return image details
            res.json(image)
        }
        )
    })
})

app.use('/api/v1', productRoutes);


const port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});