const express = require("express")
const router = express.Router()
const Fruit = require('../models/fruits')



//I.N.D.U.C.E.S
//Index, New, Delete, Update, Create, Edit, Show

//Seed Route========================
router.get("/seed",(req,res) => {
    Fruit.create([
        {
            name: 'grapefruit',
            color: 'pink',
            readyToEat: true
        },
        {
            name: 'grape',
            color: 'purple',
            readyToEat: false
        },
        {
            name: 'avocado',
            color: 'green',
            readyToEat: true
        }
    ], (err,data)=> {
        res.redirect("/fruits")
    })
})



 //=========FRUITS========================
 //INDEX=========================================
 router.get("/", (req, res) => {
    Fruit.find({}, (error, allFruits)=> {
        if(!error) {
            res.status(200).render('fruits/Index',{
                fruits: allFruits
            })
        } else {
            res.status(400).send(error)
        }
    })
  //res.render('fruits/Index')
})

//NEW=======================================================
router.get('/new', (req,res)=> {
    console.log("2. controller")
    res.render('fruits/New')
})


//DELETE=====================================================
router.delete("/:id", (req, res) => {
    Fruit.findByIdAndDelete(req.params.id, (err, data) => {
      res.redirect("/fruits")
    })
  })

//UPDATE=============================================================
router.put("/:id", (req, res)=> {
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    Fruit.findByIdAndUpdate(req.params.id, req.body, (err,updatedFruit)=>{
        if(!err) {
            res.status(200).redirect(`/fruits/${req.params.id}`)
        } else {
            res.status(400).send(err)
        }
    })
})



//CREATE======================================================
router.post("/", (req, res) => {
    console.log("2. controller")
    if(req.body.readyToEat ==="on") {
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    Fruit.create(req.body, (error,createdFruit)=>{
        if(!error) {
                //redirects after creating fruit, to the Index page
            console.log(createdFruit)
            res.status(200).redirect('/fruits')
        } else {
            res.status(400).send(error)
        }
    })

    //redirects after creating fruit, to the Index page
    //res.redirect("/fruits")
  })

  //EDIT======================================================
  router.get("/:id/edit", (req,res) => {
    Fruit.findById(req.params.id, (err, foundFruit)=> {
        if(!err) {
            res.status(200).render("fruits/Edit", {fruit: foundFruit})
        } else {
            res.status(400).send({ msg: err.message})
        }
    })
  })

//SHOW=========================================================== 
router.get("/:id", (req, res) => {
    Fruit.findById(req.params.id, (error, foundFruit) => {
        if(!error) {
            res
            .status(200)
            .render('fruits/Show', {
                fruit: foundFruit
            })
        } else {
            res
                .status(400)
                .send(error)
        }
    })
  //res.send(fruits[req.params.indexOfFruit])
  //res.render('fruits/Show',{fruits:fruits[req.params.indexOfFruit]})
  //can also do res.render('Show.jsx')
})


module.exports = router