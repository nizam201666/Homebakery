const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.static(__dirname));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post("/submit-order", upload.single("paymentProof"), (req, res) => {

  console.log(req.body);

  if(req.file){
    console.log(req.file.filename);
  }

  res.send("Order Submitted Successfully!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});