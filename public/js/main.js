/*Define variables for edit and delete icons*/
const deleteText = document.querySelectorAll('.fa-trash')
const editText = document.querySelectorAll('.fa-pen-to-square')
const createDoc = document.querySelectorAll('.fa-file-pen')

/*Add event listener to button that will submit the edit template form*/
//document.querySelector('#editTemplateButton').addEventListener('click', editTemplate)

/*Add event listeners to all delete icons*/
Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteTemplate)
})

/*Add event listeners to all edit icons*/
Array.from(editText).forEach((element) => {
    element.addEventListener('click', showTextForEditing)
})

Array.from(createDoc).forEach((element) => {
    element.addEventListener('click', showTextForCreating)
})

/*Add event listener to select customer for editing*/
//document.querySelector('#selectCustomerToEdit').addEventListener('click', editCustomer)

/*Request template in MongoDB be deleted*/
async function deleteTemplate() {
    const countyName = this.parentNode.childNodes[1].innerText
    const filingTier = this.parentNode.childNodes[3].innerText
    const templateId = this.parentNode.childNodes[5].innerText
    try {
        const res = await fetch(`deleteTemplate/${templateId}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                '_id': templateId,
                'countyName': countyName,
                'filingTier': filingTier
            })
        })

        const data = await res.json()
        console.log(data)
        location.reload()

    } catch(err) {
        console.log(err)
    }
}

/*Request template data from MongoDB and populate it into the edit template form*/
    // document.querySelector('#editTemplate').classList.toggle('hidden')
    // document.querySelector('#addTemplate').classList.add('hidden')
async function showTextForEditing() {
    const countyName = this.parentNode.childNodes[1].innerText.toLowerCase();
    const filingTier = (this.parentNode.childNodes[3].innerText.toLowerCase() === 'small claims') ? 'sc' : (this.parentNode.childNodes[3].innerText.toLowerCase() === 'county civil') ? 'cc' : 'ca';

    try {
        const res = await fetch(`summons/${countyName}&${filingTier}`)
        const data = await res.json()
        document.querySelector('#currentlyEditing').innerText = `Currently Editing: ${data.stateName} ${data.countyName} ${data.tier}`
        document.querySelector('#editTemplate').action = `/updateTemplate/${data._id}?_method=PUT`
        document.querySelector('#mongoIdEditForm').value = data._id
        document.querySelector('#editState').value = data.stateName
        document.querySelector("#editCounty").value = data.countyName
        document.querySelector("#editTierSelect").value = data.tier
        tinymce.get('editTemplateArea').setContent(data.docText)
    } catch(err) {
        console.log(err)
    }
    
}

/*Request template data from MongoDB and populate it into the create template form*/
async function showTextForCreating() {
    const countyName = this.parentNode.childNodes[1].innerText.toLowerCase();
    const filingTier = (this.parentNode.childNodes[3].innerText.toLowerCase() === 'small claims') ? 'sc' : (this.parentNode.childNodes[3].innerText.toLowerCase() === 'county civil') ? 'cc' : 'ca';

    try {
        const res = await fetch(`summons/${countyName}&${filingTier}`)
        const data = await res.json()
        document.querySelector('#selectedTemplate').innerText = `Selected Template: ${data.stateName} ${data.countyName} ${data.tier}`
        //document.querySelector('#currentlyEditing').innerText = `Currently Editing: ${data.stateName} ${data.countyName} ${data.tier}`
        //document.querySelector('#editTemplate').action = `/updateTemplate/${data._id}?_method=PUT`
        // document.querySelector('#mongoIdEditForm').value = data._id
        // document.querySelector('#editState').value = data.stateName
        // document.querySelector("#editCounty").value = data.countyName
        // document.querySelector("#editTierSelect").value = data.tier
        tinymce.get('createDocArea').setContent(data.docText)
    } catch(err) {
        console.log(err)
    }
    
}

/*Request template in MongoDB be updated with data in edit template form*/
async function editTemplate() {
    // const countyName = this.parentNode.childNodes[1].innerText
    // const filingTier = this.parentNode.childNodes[3].innerText
    const templateId = this.parentNode.childNodes[5].innerText
    const editState = document.querySelector('#editState').value
    const editCounty = document.querySelector('#editState').value
    const editFilingTier = document.querySelector('#editTierSelect').value
    const editDocText = tinymce.get('editTemplateArea').getContent()
    try {
        const res = await fetch(`editTemplate/${templateId}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                '_id': templateId,
                'stateName': editState,
                'countyName': editCounty,
                'tier': editFilingTier,
                'docText': editDocText
            })
        })

        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err) {
        console.log(err)
    }
}

// async function editCustomer() {
//     const templateId = this.
// }

/*Expand instructions on TX cover letter page*/
document.querySelector('.fa-angle-down').addEventListener('click', showElement)
function showElement() {
    document.querySelector('.instructions').classList.toggle("hidden")
}