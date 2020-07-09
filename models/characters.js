const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    race: {type: String, required: true},
    background: {type: String, required: true},
    characterClass: {type: Array},
    level: {type: Array},
    backStory: {type: String},
    items: {type: Array},
    isDead: {type: Boolean}
})

const Character = mongoose.model("Character", characterSchema)

module.exports = Character;