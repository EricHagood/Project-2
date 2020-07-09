const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const methodOverride = require('method-override')


const Character = require("../models/characters.js");


//Index route, displays all of the characters in the database
router.get('/', (req, res)=>{
    Character.find({}, (error, characters)=>{
        res.render('index.ejs', {
            characters: characters
        })
    })
})

//Test data
router.get('/seed', (req, res)=>{
    Character.create([{
        name: "Alexander",
        race: "Variant Human",
        background: "Outlander",
        characterClass: ["Fighter", "Paladin"],
        level: ['4', '2'],
        backStory: "He has one.",
        items: ["Glaive", "Plate Armor", "Holy Symbol"],
        isDead: false
    }])
})

//edit route 
router.get('/:id/edit', (req, res)=>{
    Character.findById(req.params.id, (err, foundCharater)=>{
        res.render('edit.ejs', {
            characters: foundCharater
        })
    })
})

//New route
router.get('/new', (req, res)=>{
    res.render('new.ejs')
})


//Post route to make new entries
router.post('/', (req, res)=>{
    console.log(req.body);
    console.log(req.body.backStory);
    if(req.body.isDead === 'on'){
        req.body.idDead = true;
    }else{
        req.body.isDead = false;
    }
    Character.create(req.body);
    res.redirect('/characters');
})


//Put route to update entries
router.put('/:id', (req, res)=>{
    console.log(req.body);
    console.log(req.body.name);
    if (req.body.isDead === 'on'){
        req.body.isDead = true;
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


//Delete route to delete characters from database
router.delete('/:id', (req, res)=>{
    Character.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err, data)=>{
        res.redirect('/characters')
    })
})

module.exports = router;