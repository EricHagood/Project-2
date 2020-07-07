const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    background: {type: String, required: true},
    characterClass: {type: Array, required: true},
    backStory: {type: String},
    items: {type: Array}
})

const Character = mongoose.model("Character", characterSchema)

module.exports = Character;