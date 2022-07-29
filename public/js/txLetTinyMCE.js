tinymce.init({
    selector: '#createTXLetArea',
    content_css: '/css/txLetter.css',
    plugins:'fullscreen pagebreak searchreplace print template',
    toolbar: 'template print pagebreak',
    height: '75vh',
    toolbar_sticky: true,
    autosave_restore_when_empty: true,
    // setup: (editor) => {
    //     /*Baic button to use Alias Citation Template*/
    //     editor.ui.registry.addButton('aliasCitation'), {
    //         text: 'Alias Citation',
    //         tooltip: 'Use alias citation cover letter template',
    //         onAction: (_) => editor.insertContent(url("/templates/txAliasCitLetter.html"))
    //     }
    // },

    templates: [
        {
            title: "Alias Citation",
            description: "Use to create a cover letter for an alias citation.",
            url: "/templates/txAliasCitLetter.html"
        },
        {
            title: "Amended Petition",
            description: "Use to create a cover letter for an amended petition.",
            url: "/templates/txAmendedPetLetter.html"
        }
    ],

    template_cdate_classes: "created_date",
    template_cdate_format: "%D",

    template_replace_values: {
        county: getCounty,
        court_address: getCourtAddress,
        plaintiff_name: getPlaintiffName,
        defendant_name: getDefendantName,
        case_num: getCaseNumber,
        servee_name1: getServeeName1,
        servee_address1: getServeeAddress1,
        servee_name2: getServeeName2,
        servee_address2: getServeeAddress2,
        service_type: getServiceType,
        return_type: getDocReturnMethod,
        matter_num: getMatterNum        
    }
});

function getFormValue(selector) {
    return document.querySelector(selector).value
}

function preserveLineBreak(address) {
    return address.replace(/\r\n|\r|\n/g,"</br>")
}

function getCourtAddress() {
    const testCourtAdd = getFormValue('#txCourtAddress')
    return preserveLineBreak(testCourtAdd)

}

function getCounty() {
    const txCounty = getFormValue('#txCounty').split(' ')
    if (txCounty.length === 1) return txCounty[0][0].toUpperCase() + txCounty[0].slice(1).toLowerCase()
    let properCaseTxCounty = []
    for (let i = 0; i < txCounty.length; i++) {
        properCaseTxCounty.push(txCounty[i][0].toUpperCase() + txCounty[i].slice(1).toLowerCase())
    }
    return properCaseTxCounty.join(' ')
}

function getPlaintiffName() {
    return getFormValue('#txPlaintiffName').toUpperCase()
}

function getDefendantName() {
    return getFormValue('#txDefendantName').toUpperCase()
}

function getCaseNumber() {
    return getFormValue('#txCaseNum').toUpperCase()
}

function getServeeName1() {
    return getFormValue('#servee1Name').toUpperCase()
}

function getServeeAddress1() {
    const serveeAddress = getFormValue('#servee1Address').toUpperCase()
    return preserveLineBreak(serveeAddress)
}

function getServeeName2() {
    return getFormValue('#servee2Name').toUpperCase()
}

function getServeeAddress2() {
    const serveeAddress = getFormValue('#servee2Address').toUpperCase()
    return preserveLineBreak(serveeAddress)
}

function getServiceType() {
    return getFormValue('#txServiceType')
}

function getDocReturnMethod() {
    return getFormValue('#txDocReturnMethod') === 'Email to ' ? `${getFormValue('#txDocReturnMethod')}${getFormValue('#customerEmail')}` : getFormValue('#txDocReturnMethod')
}

function getMatterNum() {
    return getFormValue('#txMatterNum')
}