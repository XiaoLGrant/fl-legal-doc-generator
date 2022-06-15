const deleteText = document.querySelectorAll('.fa-trash')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteTemplate)
})

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