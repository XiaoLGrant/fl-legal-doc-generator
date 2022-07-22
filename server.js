const express = require('express');
const app = express();
// const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors');
const ejs = require('ejs');
const { request, response } = require('express');
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

// let floridaCounties = {    
//     'manatee': {
//         '20 day': {
//             'case style': {
//                 'case number': 'case no.',
//                 'plaintiffs': 'plaintiff',
//                 'defendants': 'defendant',
//                 'title': 'summons'
//             },
//             'body': 'coming soon',
//             'ada': 'NOTICE: If you are a person with a disability who needs any accommodation in order to participate in this proceeding, you are entitled, at no cost to you, to the provision of certain assistance. Please contact the Manatee County Jury Office, P.O. Box 25400, Bradenton, Florida 34206, (941)741-4062, at least seven (7) days before your scheduled court appearance, or immediately upon receiving this notification if the time before the scheduled appearance is less than seven (7) days; if you are hearing or voice impaired, call 711.\n\nIn and for Manatee County:\nIf you cannot afford an attorney, contact Gulfcoast Legal Services at (941) 746-6151 or www.gulfcoastlegal.org, or Legal Aid of Manasota at (941) 747-1628 or www.legaidofmanasota.org. If you do not qualify for free legal assistance or do not know an attorney, you may email an attorney referral service (listed in the phone book) or contact the Florida Bar Lawyer Referral Service at (800) 342-8011.\n\nIMPORTANT\nIf you are a person with a disability who needs any accomodation in order to participate in this proceeding, you are entitled, at no cost to you, to the provision of certain assistance. Please contact the Manatee County Jury Office, P.O. Box 25400, Bradenton, Florida 34206, (941)741-4062, at least seven (7) days before your scheduled court appearance, or immediately upon receiving this notification if the time before the scheduled appearance is less thatn seven (7) days; if you are hearing or voice impared, call 711.'
//         }
//     }
//     },
    
//     'unknown': 'information not available yet'

// }

/*Get request to load the home page. Lists currently available templates.*/
app.get('/',(req, res)=>{
    db.collection('fl-templates').find().sort({countyName: 1}).toArray()
    .then(data => {
        res.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

/*Get request to load the add template page. Lists currently available templates.*/
app.get('/addTemplate.ejs', (req,res)=>{
    db.collection('fl-templates').find().sort({countyName: 1}).toArray()
    .then(data => {
        res.render('addTemplate.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

/*Get request to load the edit template page. Lists currently available templates.*/
app.get('/editTemplate.ejs', (req,res)=>{
    db.collection('fl-templates').find().sort({countyName: 1}).toArray()
    .then(data => {
        res.render('editTemplate.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

/*Get request to load the edit template page. Lists currently available templates.*/
app.get('/createDoc.ejs', (req,res)=>{
    db.collection('fl-templates').find().sort({countyName: 1}).toArray()
    .then(data => {
        res.render('createDoc.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

/*Get request to retrieve data stored in MongoDB*/
app.get('/summons/:county&:tier', (req, res) => {
    const county = req.params.county.toLowerCase();
    const tier = req.params.tier.toLowerCase();

    db.collection('fl-templates').find({countyName: county, tier: tier}).toArray()
    .then(data => {
        console.log(data)
        res.json(data[0])
    })
    .catch(error => console.error(error))    
});

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
        res.redirect('/addTemplate.ejs')
    })
    .catch(err => console.error(err))
})

/*Upodate an existing template in MongoDB.*/
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
        res.redirect('/editTemplate.ejs');
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