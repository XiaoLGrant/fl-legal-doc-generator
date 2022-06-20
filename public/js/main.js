/*Define variables for edit and delete icons*/
const deleteText = document.querySelectorAll('.fa-trash')
const editText = document.querySelectorAll('.fa-pen-to-square')

/*Add event listener to button that will submit the edit template form*/
document.querySelector('#editTemplateButton').addEventListener('click', editTemplate)

/*Add event listeners to all delete icons*/
Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteTemplate)
})

/*Add event listeners to all edit icons*/
Array.from(editText).forEach((element) => {
    element.addEventListener('click', showTextForEditing)
})

/*Request template in MongoDB be deleted*/
async function deleteTemplate() {
    const countyName = this.parentNode.childNodes[1].innerText
    const filingTier = this.parentNode.childNodes[3].innerText
    try {
        const res = await fetch('deleteTemplate', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
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
async function showTextForEditing() {
    // document.querySelector('#editTemplate').classList.toggle('hidden')
    // document.querySelector('#addTemplate').classList.add('hidden')
    const countyName = this.parentNode.childNodes[1].innerText.toLowerCase()
    const filingTier = (this.parentNode.childNodes[3].innerText.toLowerCase() === 'small claims') ? 'sc' : (this.parentNode.childNodes[3].innerText.toLowerCase() === 'county civil') ? 'cc' : 'ca'

    try {
        const res = await fetch(`summons/${countyName}&${filingTier}`)
        const data = await res.json()
        document.querySelector('#editState').value = data.stateName
        document.querySelector("#editCounty").value = data.countyName
        document.querySelector("#editTierSelect").value = data.tier
        tinymce.get('editTemplateArea').setContent(data.docText)
    } catch(err) {
        console.log(err)
    }
    
}

/*Request template in MongoDB be updated with data in edit template form*/
async function editTemplate() {
    const countyName = this.parentNode.childNodes[1].innerText
    const filingTier = this.parentNode.childNodes[3].innerText
    try {
        const res = await fetch('editTemplate', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'countyName': countyName,
                'tier': filingTier,
                'docText': req.body.docText
            })
        })

        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err) {
        console.log(err)
    }
}