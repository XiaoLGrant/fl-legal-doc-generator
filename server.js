const express = require('express');
const app = express();
// const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors');
const PORT = 7000;

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'legal-doc-templates'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then( client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let floridaCounties = {
    'broward': {
        'circuit': {
            'court': 'in the circuit court of the 17th judicial circuit in and for broward county'
            
        },
        
        'county': {
            'court': 'in the county court in and for broward county'
        },
        
        'small claims': {
            'case style': {
                'court': 'in the county court in and for broward county',
                'case number': 'case no.',
                'judge': 'judge',
                'division': 'div',
                'plaintiffs': 'plaintiff',
                'defendants': 'defendant',
                'title': 'summons/notice to appear for pretrial conference'
            },
            'body': 'STATE OF FLORIDA \– NOTICE TO PLAINTIFF(S) AND DEFENDANT(S)\n\n\n\nYOU ARE HEREBY NOTIFIED that you are required to appear in person or by attorney at the Broward County Courthouse for a PRETRIAL CONFERENCE before a Judge of this court.\n\n\n\n\n\n\n\n\n\n\nIMPORTANT \– READ CAREFULLY \nTHE CASE WILL NOT BE TRIED AT THAT TIME.\nDO NOT BRING WITNESSES--APPEAR IN PERSON OR BY ATTORNEY.\n\nThe defendant(s) must appear in court on the date specified in order to avoid a default judgment. The plaintiff(s) must appear to avoid having the case dismissed for lack of prosecution. A written MOTION or ANSWER to the court by the plaintiff(s) or the defendant(s) shall not excuse the personal appearance of a party or its attorney in the PRETRIAL CONFERENCE.  The date and time of the pretrial conference CANNOT be rescheduled without good cause and prior court approval.\nA corporation may be represented at any stage of the trial court proceedings by an officer of the corporation or any employee authorized in writing by an officer of the corporation. Written authorization must be brought to the Pretrial Conference.\nThe purpose of the pretrial conference is to record your appearance, to determine if you admit all or part of the claim, to enable the court to determine the nature of the case, and to set the case for trial if the case cannot be resolved at the pretrial conference.  You or your attorney should be prepared to confer with the court and to explain briefly the nature of your dispute, state what efforts have been made to settle the dispute, exhibit any documents necessary to prove the case, state the names and addresses of your witnesses, stipulate to the facts that will require no proof and will expedite the trial, and estimate how long it will take to try the case.\n\nMediation may take place at the pretrial conference. Whoever appears for a party must have full authority to settle. Failure to have full authority to settle at this pretrial conference may result in the imposition of costs and attorney fees incurred by the opposing party.\n\nIf you admit the claim, but desire additional time to pay, you must come and state the circumstances to the court. The court may or may not approve a payment plan and withhold judgment or execution or levy.\n\nRIGHT TO VENUE. The law gives the person or company who has sued you the right to file in any one of several places as listed below.  However, if you have been sued in any place other than one of these places, you, as the defendant(s), have the right to request that the case be moved to a proper location or venue.  A proper location or venue may be one of the following: (1) where the contract was entered into; (2) if the suit is on an unsecured promissory note, where the note is signed or where the maker resides; (3) if the suit is to recover property or to foreclose a lien, where the property is located; (4) where the event giving rise to the suit occurred; (5) where any one or more of the defendants sued reside; (6) any location agreed to in a contract; (7) in an action for money due, if there is no agreement as to where the suit may be filed, where payment is to be made.\n\nIf you, as the defendant(s), believe the plaintiff(s) has/have not sued in one of these correct places, you must appear on your court date and orally request a transfer, or you must file a WRITTEN request for transfer in affidavit form (sworn to under oath) with the court 7 days prior to your first court date and send a copy to the plaintiff(s) or plaintiff(s) attorney, if any.\n\nA copy of the statement of claim shall be served with this summons.\n\nDATED at ____________ Florida, on\n\n\n\n\nBy _____________________\BRENDA D. FORMAN AS\nCLERK OF THE COURT\n\nFiled By:\n\nAddress:\n\n\nIf you are a person with a disability who needs any accommodation in order to participate in this proceeding, you are entitled, at no cost to you, to the provision of certain assistance. Please contact the ADA Coordinator, Room 20140, 201 S.E. Sixth Street, Fort Lauderdale, Florida 33301, 954-831-7721 at least 7 days before your scheduled court appearance, or immediately upon receiving this notification if the time before the scheduled appearance is less than 7 days. If you have a hearing or voice disability you can contact the court through the Florida Relay Service by calling 711.'
        },

        '20 day': {
            'case style': {
                'case number': 'case no.',
                'judge': 'judge',
                'division': 'div',
                'plaintiffs': 'plaintiff',
                'defendants': 'defendant',
                'title': 'summons'
            },
            'body': 'coming soon',
            'ada': 'coming soon'
        }
    },
    
    'manatee': {
        'circuit': {
            'court': 'in the circuit court in and for manatee county'
            
        },
        
        'county': {
            'court':'in the county court in and for manatee county'
        },
        
        'small claims': {
            'case style': {
                'court': 'in the county court in and for manatee county',
                'case number': 'case no.',
                'plaintiffs': 'plaintiff',
                'defendants': 'defendant',
                'title': 'notice to appear for pretrial conference/mediation'
            },
            'body': 'STATE OF FLORIDA - NOTICE TO PLAINTIFF(S) AND DEFENDANT(S):\nDefendant to be served at:\n\n\n\n\nYOU ARE HEREBY NOTIFIED that you are required to appear via Zoom for a video conference or by Telephone, on  ____/____/ ______ at                       for a PRETRIAL CONFERENCE.\nZOOM VIDEO CONFERENCE AND TELEPHONE CONFERENCE INSTRUCTIONS FOR SMALL CLAIMS PRE-TRIALS (see instructions on next page)\nWebsite URL: ZOOM.US\nMeeting ID: 794 875 0234\nPassword: 246033\nDial-in (Telephone) Information: 1-786-635-1003\nIMPORTANT - READ CAREFULLY\nTHE CASE WILL NOT BE TRIED AT THE PRETRIAL CONFERENCE, BUT MAY BE MEDIATED AT A LATER TIME VIA ZOOM CONFERENCE.\nDO NOT BRING WITNESSES.  YOU MUST APPEAR IN PERSON OR BY ATTORNEY VIA ZOOM OR BY TELEPHONE CONFERENCE.\n\nWHOEVER APPEARS FOR A PARTY MUST HAVE FULL AUTHORITY TO SETTLE FOR ALL AMOUNTS FROM ZERO TO THE AMOUNT OF THE CLAIM WITHOUT FURTHER CONSULTATION. FAILURE TO COMPLY MAY RESULT IN THE IMPOSITION OF SANCTIONS, INCLUDING COSTS, ATTORNEY FEES, ENTRY OF JUDGMENT, OR DISMISSAL.\n\nThe defendant(s) must appear via Zoom or by telephone on the date specified in order to avoid a default judgment. The plaintiff(s) must appear via Zoom or by Telephone to avoid having the case dismissed for lack of prosecution. A written MOTION or ANSWER to the court by the plaintiff(s) or the defendant(s) shall not excuse the personal appearance of a party or its attorney in the PRETRIAL CONFERENCE/MEDIATION. The date and time of the pretrial conference CANNOT be rescheduled without good cause and prior court approval.\n\nA corporation may be represented at any stage of the trial court proceedings by an officer of the corporation or any employee authorized in writing by an officer of the corporation. Written authorization must be brought to the Pretrial Conference/Mediation.\n\nThe purpose of the pretrial conference is to record your appearance, to determine if you admit all or part of the claim, to enable the court to determine the nature of the case, and to set the case for trial if the case cannot be resolved at the pretrial conference. You or your attorney should be prepared to confer with the court and to explain briefly the nature of your dispute, state what efforts have been made to settle the dispute, exhibit any documents necessary to prove the case, state the names and addresses of your witnesses, stipulate to the facts that will require no proof and will expedite the trial, and estimate how long it will take to try the case.\n\nMediation\n\nMediation will be conducted via Zoom and/or by Telephone at a later date and time. Mediation is a process whereby an impartial and neutral third person called a mediator acts to encourage and facilitate the resolution of a dispute between two or more parties, without prescribing what the resolution should be. It is an informal and non-adversarial process with the objective of helping the disputing parties reach a mutually acceptable and voluntary agreement.\n\nIn mediation, decision making rests with the parties.  Negotiations in county court mediation are primarily conducted by the parties. Counsel for each party may participate. However, presence of counsel is not required. If a full agreement is not reached at mediation, the remaining issues of the case will be set for trial. Mediation communications are confidential and privileged except where disclosures are required or permitted by law.\n\n____________________________________________________________________________________________________________\n\nIf you admit the claim, but desire additional time to pay, you must come and state the circumstances. The court may or may not approve a payment plan and may withhold judgment or execution or levy.\n\nRIGHT TO VENUE. The law gives the person or company who has sued you the right to file in any one of several places as listed below. However, if you have been sued in any place other than one of these places, you, as the defendant(s), have the right to request that the case be moved to a proper location or venue. A proper location or venue may be one of the following: (1) where the contract was entered into; (2) if the suit is on an unsecured promissory note, where the note is signed or where maker resides; (3) if the suit is to recover property or to foreclose a lien, where the property is located; (4) where the event giving rise to the suit occurred; (5) where any one or more of the defendants sued reside; (6) any location agreed to in a contract; (7) in an action for money due, if there is no agreement as to where suit may be filed, where payment is to be made.\n\nIf you, as the defendant(s), believe the plaintiff(s) has/have not sued in one of these correct places, you must appear on your court date and orally request a transfer, or you must file a WRITTEN request for transfer in affidavit form (sworn to under oath) with the court 7 days prior to your first court date and send a copy to the plaintiff(s) or plaintiff\'s(s\') attorney, if any.\n\nA copy of the statement of claim shall be served with this summons.\n\n\n\nDATED at Bradenton, Florida on _____/_____/_____\n\n\n\nBy:____________________________\nDeputy Clerk\nAngelina Colonneso\nAsClerk of Circuit Court\nZoom Instructions:\nOPTION ONE: APPEARANCE VIA ZOOM VIDEO:\n\n1. Download the free Zoom App. On your smartphone or computer PRIOR to your Hearing date. https://www.zoom.us \n2. On the date and time of your hearing, select "Join a Meeting" and then enter your Meeting ID and Password to access the meeting. Where do you find these? Look on your Summons or Notice of Hearing\n3. Once you connect, please wait to be checked in. You may be placed in a "waiting room" and on mute until your hearing begins.\n\nOPTION TWO: APEARI NG VIA ZOOM AUDIO (PHONE)\n\nNo Camera. No problem! The Zoom Platform allows you to appear by telephone if you do not have a camera or a computer. On the date and time of your hearing, just call (786) 635-1003. Then enter your Meeting ID and Password to get into the Pre-Trial. Once you connect, please wait as you may be placed on mute until your hearing begins. Press *6 to mute and unmute your telephone.\n\nNOTICE: If you are a person with a disability who needs any accommodation in order to participate in this proceeding, you are entitled, at no cost to you, to the provision of certain assistance. Please contact the Manatee County Jury Office, P.O. Box 25400, Bradenton, Florida 34206, (941)741-4062, at least seven (7) days before your scheduled court appearance, or immediately upon receiving this notification if the time before the scheduled appearance is less than seven (7) days; if you are hearing or voice impaired, call 711.\n\nIn and for Manatee County:\nIf you cannot afford an attorney, contact Gulfcoast Legal Services at (941) 746-6151 or www.gulfcoastlegal.org, or Legal Aid of Manasota at (941) 747-1628 or www.legaidofmanasota.org. If you do not qualify for free legal assistance or do not know an attorney, you may email an attorney referral service (listed in the phone book) or contact the Florida Bar Lawyer Referral Service at (800) 342-8011.'
        },

        '20 day': {
            'case style': {
                'case number': 'case no.',
                'plaintiffs': 'plaintiff',
                'defendants': 'defendant',
                'title': 'summons'
            },
            'body': 'coming soon',
            'ada': 'NOTICE: If you are a person with a disability who needs any accommodation in order to participate in this proceeding, you are entitled, at no cost to you, to the provision of certain assistance. Please contact the Manatee County Jury Office, P.O. Box 25400, Bradenton, Florida 34206, (941)741-4062, at least seven (7) days before your scheduled court appearance, or immediately upon receiving this notification if the time before the scheduled appearance is less than seven (7) days; if you are hearing or voice impaired, call 711.\n\nIn and for Manatee County:\nIf you cannot afford an attorney, contact Gulfcoast Legal Services at (941) 746-6151 or www.gulfcoastlegal.org, or Legal Aid of Manasota at (941) 747-1628 or www.legaidofmanasota.org. If you do not qualify for free legal assistance or do not know an attorney, you may email an attorney referral service (listed in the phone book) or contact the Florida Bar Lawyer Referral Service at (800) 342-8011.\n\nIMPORTANT\nIf you are a person with a disability who needs any accomodation in order to participate in this proceeding, you are entitled, at no cost to you, to the provision of certain assistance. Please contact the Manatee County Jury Office, P.O. Box 25400, Bradenton, Florida 34206, (941)741-4062, at least seven (7) days before your scheduled court appearance, or immediately upon receiving this notification if the time before the scheduled appearance is less thatn seven (7) days; if you are hearing or voice impared, call 711.'
        }
    },    
    
    'santa rosa': {
        'circuit': {
            'court':'in the circuit court in and for santa rosa county'
        },
        
        'county': {
            'court':'in the county court in and for santa rosa county'
        },
        
        'small claims': {
            'case style': {
                'court': 'in the county court in and for santa rosa county',
                'case number': 'case no.',
                'plaintiffs': 'plaintiff(s)',
                'defendant': 'defendant(s)',
                'title': 'summons/notice to appear for pretrial conference'
            },
            'body': 'STATE OF FLORIDA - NOTICE TO PLAINTIFF(S) AND DEFENDANT(S):/n/n/n/n/n/nARE HEREBY NOTIFIED that you or your attorney are required to appear VIA ZOOM TELEPHONE OR VIDEO CONFERENCE, on _______________________, 20____ at _________: _________ a.m./p.m. CST for a PRE-TRIAL CONFERENCE before a Judge of this Court.\n\nPLEASE DRESS APPROPRIATELY:  NO SHORTS, TANK TOPS, HALTER TOPS, OR FLIP FLOPS!\n\nIMPORTANT--READ CAREFULLY:  THE CASE WILL NOT BE TRIED AT THAT TIME\n\nDO NOT BRING WITNESSES   APPEAR IN PERSON OR BY ATTORNEY\n\nThe defendant(s) must appear in court on the date specified to avoid a Default Judgment. The Plaintiff(s) must appear to avoid having the case dismissed for lack of prosecution. A written MOTION or ANSWER to the court by the Plaintiff(s) or the Defendant(s) shall not excuse the personal appearance of a party or its attorney at the PRE-TRIAL CONFERENCE. The date and time of the Pre-Trial Conference CANNOT be rescheduled without good cause and prior court approval.\nA corporation may be represented at any stage of the trial court proceedings by an officer of the corporation, or any employee authorized in writing by an officer of the corporation.  Written authorization must be brought to the Pre-Trial Conference.\n\nThe purpose of the Pre-Trial Conference is to record your appearance, to determine if you admit all or part of the claim, to enable the court to determine the nature of the case, and to set the case for Trial if the case cannot be resolved at the Pre-Trial Conference. You or your attorney should be prepared to confer with the court and to briefly explain the nature of your dispute, state what efforts have been made to settle the dispute, exhibit any documents necessary to prove the case, state the names and addresses of your witnesses, stipulate to the facts that will require no proof and will expedite the trial, and estimate how long it will take to try the case.\n\nIf you admit the claim, but desire additional time to pay, you must come and state the circumstances to the Court. The Court may or may not approve a payment plan and withhold Judgment or Execution or Levy.\n\nRIGHT TO VENUE. The law gives the person or company who has sued you the right to file in any one of several places as listed below. However, if you have been sued in any place other than one of these places, you, as the Defendant(s), have the right to request that the case be moved to a proper location or venue. A proper location or venue may be one of the following:  1) Where the contract was entered into;  2) If the suit  is on an unsecured promissory note, where the note is signed or where the maker resides;  3) If the suit is to recover property or to foreclose a lien, where the property is located;  4) Where the event giving rise to the suit occurred;  5) Where any one or more of the defendant(s) sued resides;  6) Any location agreed to in a contract;  7)  In an action for money due, if there is no agreement as to where suit may be filed, where payment is to be made.\n\nIf you, as the Defendant(s), believe the Plaintiff(s) has/have not sued in one of these correct places, you must appear on your court date and orally request a transfer, or you must file  a WRITTEN request for transfer in affidavit form (sworn to under oath) with the court seven (7) days prior to your first court date and send a copy to the Plaintiff(s) or Plaintiff(s=) attorney, if any.\n\nA copy of the Statement of Claim shall be served with this summons.\n\nIf you desire to file any counterclaim or off-set to Plaintiff\'s said claim, it must be filed in this Court by you or your attorney in writing at least five (5) days prior to the above date. You should also serve a copy to the Plaintiff(s), by mail.\n\nMagistrate Michelle Inere is inviting you to a scheduled Zoom Meeting.\n\nMeeting ID: 658 039 3323. Enter the Magistrate\’s ZOOM Meeting ID when prompted.\n\nYou may join this meeting from a Computer, Smartphone, or Tablet. You will be prompted upon joining the meeting as to which device you want to use for audio. You may either select “Join with computer audio” to use the built-in microphone and speakers on your device, or you may select “phone call” and dial in on a separate telephone for audio.\n\nIf your video does not automatically turn on upon joining the meeting, you may need to click in the bottom left corner to “Start Video.”\n\nPlease use the link below to connect to the Zoom meeting. You may join the meeting anytime beforehand to test your speakers and microphone using the built-in test feature. Please be advised that this is a court event and will be digitally recorded.  All participants will be recorded from the time you log in until you exit.\n\n*Please use a quiet, well-lighted room for the Zoom hearing, with no distracting backgrounds.\n\n*Please remember to mute your microphone when you are not speaking.\n\n*Please connect to the Zoom meeting 5 minutes before the hearing begins. **\n\nJoin Zoom Meeting from Computer:\nhttps://zoom.us/j/6580393323 \n\nMeeting ID: 658 039 3323\n\nDial-in from telephone\n+1 312 626 6799 US (Primary)\n+1 929 205 6099 US (Secondary)\n\nThe parties are required to have a Notary or other authorized person who can administer an oath in his/her presence on the date of the hearing, for those dialing-in only.\n\nSincerely,\n\nBrittany Elliott\nAdministrative Assistant to\nMagistrate Michelle Inere\n850-981-5599\nBrittany.Elliott@FLCourts1.gov\n\n\n\n\nDated at Milton, Santa Rosa County, Florida, on this ______day of ______ , 20_____.\n\n\nDONALD C. SPENCER, Clerk of Courts and Comptroller\n\n\n\n\nBY:  ______________________________________\nDeputy Clerk of Santa Rosa County\n\n\nIf you are a person with a disability who needs any accommodation to participate in this proceeding, you are entitled, at no cost to you, to the provision of certain assistance. Please contact: Court Administration, ADA Liaison Santa Rosa County 6865 Caroline Street Milton, FL 32570 Phone (850) 623-3159 Fax (850) 983-0602 ADA.SantaRosa@flcourts1.gov at least 7 days before your scheduled court appearance, or immediately upon receiving this notification if the time before the scheduled appearance is less than 7 days; if you are hearing or voice impaired, call 711.'
        },

        '20 day': {
            'case style': {
                'case number': 'case no.',
                'plaintiffs': 'plaintiff(s)',
                'defendant': 'defendant(s)',
                'title': 'summons'
            },
            'body': 'coming soon',
            'ada': 'coming soon'
        }
    },
    
    'unknown': 'information not available yet'

}

app.use(cors());

app.get('/',(req, res)=>{
    db.collection('fl-templates').toArray()
    .then(data => {
        res.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})


// MongoClient.connect(/*'...mogno db link'*/)
//     .then(client => {
//         console.log('Connected to database')
//         const db = client.db(/*'database name'*/)
//         const collectionName = db.collection(/*'collection name'*/)

//         app.set('view engine', 'ejs') //i don't remember what this does

//         app.use(bodyParser.urlencoded({ extended: true})) //i don't remember what this does
//         app.use(express.static('public')) //i don't remember what this does
//         app.use(bodyParser.json()) //i don't remember what this does



//     app.get('/', (req, res) => { //will this work if it's not nested in the mongo db connection? probably not b/c of listen nested in here? 
//         res.sendFile(__dirname + '/index.html');
//     });

//     app.get('/summons/:county&:tier', (req, res) => {
//         const county = req.params.county.toLowerCase();
//         const tier = req.params.tier.toLowerCase();

//         //res.json(floridaCounties['manatee'][tier])

//         if (floridaCounties[county]) {
//             if (tier === 'ca') {
//                 res.json({'court': floridaCounties[county]['circuit']['court'], 'summons text': floridaCounties[county]['20 day']});
//             } else if (tier === 'cc') {
//                 res.json({'court': floridaCounties[county]['county']['court'], 'summons text': floridaCounties[county]['20 day']});
//             } else if (tier === 'sc') {
//                 res.json(floridaCounties[county]['small claims']);
//             } else {
//                 res.json(floridaCounties[county])
//             }
            
//         } else if (!floridaCounties[county]) {
//             res.json(floridaCounties['unknown']);
//         }
        
//     });

//     app.post('/summons/:county&:tier', (req, res) => {
//         const county = req.params.county.toLowerCase();
//         const tier = req.params.tier.toLowerCase();

//         collectionName.insertOne(req.body)
//             .then(res => {
//                 res.redirect('/')
//             })
//             .catch(err => console.error(err))
//     })

//     app.put('/summons/:county&:tier', (req, res) => {
//         const county = req.params.county.toLowerCase();
//         const tier = req.params.tier.toLowerCase();

//         collectionName.findOneAndUpdate(
//             { county: `${county}`},
//             {
//                 $set: {
//                     body: req.body.body //will need to figure out how to target nested json fields
//                 }
//             },
//             {
//                 upsert: true //idk what this is for
//             }
//         )
//         .then(res => {
//             res.json('Success')
//         })

//     })

//     app.delete('/summons/:county&:tier', (req, res) => {
//         const county = req.params.county.toLowerCase();
//         const tier = req.params.tier.toLowerCase();

//         collectionName.deleteOne(
//             {/*figure out how to target nested json fields*/}
//         ).then(result => {
//             if (result.deletedCount === 0) {
//                 return res.json('No document info to delete.')
//             }
//             res.json('Deleted document info.')
//         })
//         .catch(err => console.error(err))
//     })

//     app.listen(process.env.PORT || PORT, () => {
//         console.log(`The server is currently running on port ${PORT}.`);
//     });
//     })
//     .catch(error => console.error(error))