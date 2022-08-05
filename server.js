const express = require('express');
const app = express();
// const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require('fs')
const cors = require('cors');
const ejs = require('ejs');
const methodOverride = require('method-override')
const PORT = 7000;
require('dotenv').config()

var ObjectId = require('mongodb').ObjectId

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'legal-doc-templates'

/*Connect to MongoDB*/
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true, useNewUrlParser: true })
.then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(methodOverride('_method'))
app.use(cors());

app.use( function( req, res, next ) {
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    // then we know, clients need to call DELETE request instead
    if ( req.query._method == 'PUT' ) {
        // change the original METHOD
        // into DELETE method
        req.method = 'PUT';
        // and set requested url to /user/12
        req.url = req.path;
    }       
    next(); 
});

/*Get request to load the home page. Lists currently available templates.*/
app.get('/',(req, res)=>{
    db.collection('fl-templates').find().sort({countyName: 1}).toArray()
    .then(data => {
        res.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

/*Get request to load the add template page. Lists currently available templates.*/
app.get('/addTemplate', (req,res)=>{
    db.collection('fl-templates').find().sort({countyName: 1}).toArray()
    .then(data => {
        res.render('addTemplate.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

/*Get request to load the edit template page. Lists currently available templates.*/
app.get('/editTemplate', (req,res)=>{
    db.collection('fl-templates').find().sort({countyName: 1}).toArray()
    .then(data => {
        res.render('editTemplate.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

/*Get request to load the edit template page. Lists currently available templates.*/
app.get('/createDoc', (req,res)=>{
    db.collection('fl-templates').find().sort({countyName: 1}).toArray()
    .then(data => {
        res.render('createDoc.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

/*Get request to load create TX alias/amended pet page.*/
app.get('/createTXLet', (req, res)=>{
    db.collection('fl-templates').find().sort({countyName: 1}).toArray()
    .then(data => {
        res.render('createTXLetDisable.ejs', {info: data});
    })
    .catch(error => console.log(error));
})

/*Get request to retrieve FL template data stored in MongoDB*/
app.get('/summons/:county&:tier', (req, res) => {
    const county = req.params.county.toLowerCase();
    const tier = req.params.tier.toLowerCase();

    db.collection('fl-templates').find({countyName: county, tier: tier}).toArray()
    .then(data => {
        res.json(data[0])
    })
    .catch(error => console.error(error))    
});

app.get('/tx/:template', (req, res) => {
    const template = req.params.template.toLowerCase();

    db.collection('tx-templates').find({templateName: template}).toArray()
    .then(data => {
        res.json(data[0])
    })
    .catch(error => console.error(error))
})

/*Get request for testing pdflib*/
app.get('/createTxAlias', async (req, res) => {
    try {
        const templateData = await db.collection('tx-templates').find().sort({templateName: 1}).toArray()
        const customerData = await db.collection('abc-customers').find().sort({customerName: 1}).toArray()

        res.render('createTxAlias.ejs', {
            templateInfo: templateData,
            customerInfo: customerData
        })
    } catch (err) {
        console.log(err)
    }

});

/*Get request for Customer emails*/
app.get('/customer/:nickname', (req, res) => {
    const nickname = req.params.nickname
    db.collection('abc-customers').find({nickname: nickname}).toArray()
    .then(data => {
        res.json(data[0])
        // res.render('testpdflib.ejs', {info: data})
        // console.log(data)
    })
    .catch(error => console.error(error));


})

/*Post request to add a new template to MongoDB*/
app.post('/addTemplate', (req, res) => {
    db.collection('fl-templates').insertOne({
        stateName: req.body.stateName,
        countyName: req.body.countyName,
        tier: req.body.filingTier, 
        docText: req.body.docText
    })
    .then(result => {
        console.log('Template added');
        res.redirect('/addTemplate')
    })
    .catch(err => console.error(err))
})

/*Post request to add a customer email to MongoDB*/
app.post('/addCustomerContact', (req, res) => {
    db.collection('abc-customers').insertOne({
        customerName: req.body.customerName,
        nickname: req.body.customerNickname,
        email: req.body.customerEmail
    })
    .then(result => {
        console.log('Email added');
        res.redirect('/addTEmplate')
    })
})

/*Update an existing template in MongoDB.*/
app.put('/updateTemplate/:id', (req, res) => {
    db.collection('fl-templates').updateOne({
        _id: new ObjectId(`${req.params.id}`)
        }, {
            $set: {
                stateName: req.body.stateName,
                countyName: req.body.countyName,
                tier: req.body.filingTier,
                docText: req.body.docText
            }
        }, {
            sort: {_id: 1},
            upsert: false
        })
    .then(result => {
        console.log('Template updated');
        res.redirect('/editTemplate');
    })
    .catch(err => console.error(err))
})

/*Delete a template from MongoDB*/
app.delete('/deleteTemplate/:id', (req, res) => {
    db.collection('fl-templates').deleteOne({_id: new ObjectId(`${req.params.id}`)})
    .then (result => {
        console.log('Template deleted')
        res.json('Template deleted')
    })
    .catch(err => console.error(err))
})

/*Enables server to run on host's port or defined port if using localhost*/
app.listen(process.env.PORT || 7000, ()=>{
    console.log(`Server running on port ${PORT}`)
})