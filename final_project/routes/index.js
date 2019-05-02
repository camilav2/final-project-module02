<<<<<<< HEAD
const express        = require("express");
const router          = express.Router();
=======
const express = require('express');
const router  = express.Router();
const test = "delete later"
>>>>>>> 2ac86510a985e8c9b2c6e235296b99924945b672

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


module.exports = router;
