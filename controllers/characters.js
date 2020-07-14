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
router.get('/test', (req, res)=>{
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
        req.body.isDead = true;
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
//This post method was written following this documentation https://medium.com/stackfame/how-to-push-or-pop-items-into-mongodb-document-array-via-mongoose-in-node-js-express-js-91b7bbd0d218
router.post('/:id/addItem', (req, res)=>{
    Character.findByIdAndUpdate(req.params.id, {"$push": {items: req.body.item}}, {new: true}, (err, updatedCharacter)=>{
})
})//These Two post methods update specific parts of the Character object while still remaining in the edit page
router.post('/:id/addClass', (req, res)=>{
    Character.findByIdAndUpdate(req.params.id, {"$push": {characterClass: "", level: ""} }, {new: true}, (err, updatedCharacter)=>{
        res.redirect('/characters/'+ req.params.id + '/edit');
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