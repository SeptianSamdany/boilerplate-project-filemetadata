var express = require('express');
var cors = require('cors');
var multer  = require('multer');
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Set up multer to handle file uploads
var storage = multer.memoryStorage();  // Store file in memory
var upload = multer({ storage: storage });

// Serve the index.html file
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST route to handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Extract file details
  const { originalname, mimetype, size } = req.file;

  // Send JSON response with file details
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

// Listen to port
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
