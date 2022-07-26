tinymce.init({
    selector: '#createTXLetArea',
    content_css: '/css/txLetter.css',
    plugins:'fullscreen pagebreak searchreplace table print template',
    toolbar: 'template print',
    min_height: '90vh',
    max_width: '70vw',
    toolbar_sticky: true,
    autosave_restore_when_empty: true,
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

    template_replace_values: {
        county: getCounty,
        court_street: getCourtStreet,
        court_city: getCourtCity,
        court_zip: getCourtZip,
        plaintiff_name: getPlaintiffName,
        defendant_name: getDefendantName,
        case_num: getCaseNumber,
        servee_name: getServeeName,
        servee_street: getServeeStreet,
        servee_city: getServeeCity,
        servee_state: getServeeState,
        servee_zip: getServeeZip,
        service_type: getServiceType,
        return_type: getDocReturnMethod,
        matter_num: getMatterNum
    }
});

function getCounty() {
    return document.querySelector('#txCounty').value
}

function getCourtStreet(){
    return document.querySelector('#txCourtStreet').value
}

function getCourtCity(){
    return document.querySelector('#txCourtCity').value
}

function getCourtZip(){
    return document.querySelector('#txCourtZip').value
}

function getPlaintiffName() {
    return document.querySelector('#txPlaintiffName').value
}

function getDefendantName() {
    return document.querySelector('#txDefendantName').value
}

function getCaseNumber() {
    return document.querySelector('#txCaseNum').value
}

function getServeeName() {
    return document.querySelector('#txServeeName').value
}

function getServeeStreet() {
    return document.querySelector('#txServeeStreet').value
}

function getServeeCity() {
    return document.querySelector('#txServeeCity').value
}

function getServeeState() {
    return document.querySelector('#txServeeState').value
}

function getServeeZip() {
    return document.querySelector('#txServeeZip').value
}

function getServeeZip() {
    return document.querySelector('#txServeeZip').value
}

function getServiceType() {
    return document.querySelector('#txServiceType').value
}

function getDocReturnMethod() {
    return document.querySelector('#txDocReturnMethod').value === 'Email to ' ? `${document.querySelector('#txDocReturnMethod').value}${document.querySelector('#customerEmail').value}` : document.querySelector('#txDocReturnMethod').value
}

function getMatterNum() {
    return document.querySelector('#txMatterNum').value
}