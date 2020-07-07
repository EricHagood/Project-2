const express = require('express');
const router = express.Router();

const Character = require("../models/characters.js");

router.get('/', (req, res)=>{
    res.send("This pathing works");
})

module.exports = router;