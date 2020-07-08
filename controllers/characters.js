const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Character = require("../models/characters.js");
const testCharacter = {
    name: "Alexander",
    background: "Outlander",
    characterClass: [{
        characterClass1: "Fighter", 
        level: 4
    },{
        characterClass2: "Paladin", 
        level: 2
    }],
    backStory: "He has one.",
    items: ["Glaive", "Plate Armor", "Holy Symbol"]
}
// Character.create(testCharacter, (err, character)=>{
//     if (err){console.log(err);}
//     else{console.log(character)}
// });
console.log(Character);
//Index route, displays all of the characters in the database
router.get('/', (req, res)=>{
    Character.find({}, (error, characters)=>{
        res.render('index.ejs', {
            characters: characters
        })
    })
})
//edit route 
router.get('/:id/edit', (req, res)=>{
    Character.findById(req.params.id, (err, foundCharater)=>{
        res.render('edit.ejs', {
            characters: foundCharater
        })
    })
})
router.put('/:id', (req, res)=>{
    if (req.body.isDead == 'on'){
        req.body.idDead = true;
    }else{
        req.body.isDead = false;
    }
    Character.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCharacter)=>{
        res.redirect('/characters');
    })
})

//show route
router.get('/:id', (req, res)=>{
    Character.findById(req.params.id, (err, foundCharacter)=>{
        res.render('show.ejs', {
            character: foundCharacter
        })
    })
})

//
router.get('/seed', (req, res)=>{
    Character.create([{
        name: "Alexander",
        background: "Outlander",
        characterClass: [{
            characterClass: "Fighter", 
            level: 4
        },{
            characterClass: "Paladin", 
            level: 2
        }],
        backStory: "He has one.",
        items: ["Glaive", "Plate Armor", "Holy Symbol"],
        isDead: false
    }])
})

module.exports = router;