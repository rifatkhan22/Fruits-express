//CRUD
//post --- CREATE
//get --   READ
//put --   UPDATE
//delete -- DELETE
//MVC
//Models- data or javascript variables
//views - how data is used or viewed to the user using html
//controller - glue that connects models with the views using logic
//INDUCES========
//index route -- table of contents== display a list of all photos
//new 
//delete
//update
//create
//edit
//show--turn to the page you searched for in table of cont == display specific photo ==
require('dotenv').config()//access variables in env
const express = require("express")
const app = express()
const PORT = 3000
const Vegetable = require('./models/vegetables')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const fruitsController = require("./controllers/fruitController")
//NOTE: it must start with ./ if it's just a file, not an NPM package
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.once("open", () => {
    console.log('connected to mongo')
})

//another way for line 28
//const reactViews = require('express-react-views')
//app.engine('jsx',reactViews.createEngine())

//two lines of code to use the JSX view Engine
app.set('view engine', 'jsx')// look for jsx files
// More conventional way to create the engine
app.engine('jsx', require('express-react-views').createEngine())

//======MIDDLEWARE========================================
app.use((req, res, next) => {
    console.log("Im running for all routes")
    console.log("1. middleware")
    next()
  })
  
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))

//===========ROUTES===========
//every single route in fruitcontroller will use thus
app.use("/fruits", fruitsController)



//=======VEGETABLES===========
app.get("/vegetables", (req,res) => {
    Vegetable.find({},(error,allVegetables)=> {
        if(!error) {
            res.status(200).render('vegetables/Index', {
                vegetables: allVegetables
            })
        } else {
            res.status(400).send(error)
        }
    })
  })
  
  //NEW (for)
  app.get("/vegetables/new", (req,res) => {
    console.log("2.controller")
    res.render("vegetables/New")
  })
  
  
  //CREATE
  app.post("/vegetables", (req,res) => {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true
    } else {
      req.body.readyToEat = false
    }
    Vegetable.create(req.body, (error,createdVegetable)=>{
        if(!error) {
            //redirects after creating fruit to the index page
            console.log(createdVegetable)
            res.status(200).redirect('/vegetables')
        } else {
            res.status(400).send(error)
        }
    })
  })
  

  app.get("/vegetables/:id", (req,res) => {
    Vegetable.findById(req.params.id, (error, foundVegetable)=> {
        if(!error) {
            res
            .status(200)
            .render('vegetables/Show', {
                vegetable: foundVegetable
            })
        } else {
            res
                .status(400)
                .send(error)
        }
    })
  })
  
         
app.listen(PORT, () => { 
  console.log(`Listening on port: ${PORT}`)
}) 