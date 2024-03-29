const { PDFDocument, StandardFonts, rgb } = PDFLib

document.querySelector('#create').addEventListener('click', fillForm)

async function fillForm() {
  //Get form
  //const template = getTemplate()
  const template = await fetch(`tx/${getTemplate()}`)
  const templateData = await template.json()
  const formUrl = `/templates/tx-templates/${templateData.fileName}.pdf`
  const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const form = pdfDoc.getForm()

  //Get the form fields
  const caseNumField = form.getTextField('caseNumber')
  const servee1AddField = form.getTextField('servee1')
  const servee2AddField = form.getTextField('servee2')
  const courtInfo = form.getTextField('courtInfo')
  const caseInfo = form.getTextField('caseInfo')
  const serviceType = form.getTextField('serviceType')
  const docReturnType = form.getTextField('docReturnType')
  const matterNum = form.getTextField('matterNumber')
  const generatedDate = form.getTextField('generateDate')

  //Fill out the form fields
  caseNumField.setText(getCaseNum())
  courtInfo.setText(`Clerk of the Court\n${getCounty()}, Texas\n${getCourtAddress()}`)
  caseInfo.setText(`${getPlaintiff()} vs. ${getDefendant()}; ${getCourt()}`)
  servee1AddField.setText(getServee1Info())
  servee2AddField.setText(getServee2Info())
  caseNumField.setText(getCaseNum())
  serviceType.setText(`Please issue a separate Citation for each defendant for service by a ${getServiceType()}.`)
  docReturnType.setText(await getDocReturnMethod())
  matterNum.setText(`Matter Number: ${getMatterNum()}`)
  generatedDate.setText(`Generated: ${getDate()}`)

  //Convert pdf to format viewable in an iframe and display in iframe
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  document.getElementById('pdfPreview').src = pdfDataUri;

  // Serialize the PDFDocument to bytes (a Uint8Array)
  //const pdfBytes = await pdfDoc.save()

  // Trigger the browser to download the PDF document
  //download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");

}

function getFormValue(selector) {
  return document.querySelector(selector).value
}

function splitAtNewLineAndTrim(selector) {
  return getFormValue(selector).split('\n').map(string => string.trim())
}

function getTemplate() {
  return getFormValue('#txAliasTemplate')
}

//Helper functions to get party info
function getPlaintiff() {
  return getFormValue('#plaintiffName').toUpperCase()
}

function getDefendant() {
  return getFormValue('#defendantName').toUpperCase()
}

function getServee1Info() {
  const serveeAddress = getFormValue('#servee1Address').toUpperCase()
  const serveeName = getFormValue(`#servee1Name`).toUpperCase()
  return `${serveeName}\n${serveeAddress}`
}

function getServee2Info() {
  const serveeAddress = getFormValue('#servee2Address').toUpperCase()
  const serveeName = getFormValue('#servee2Name').toUpperCase()
  return `${serveeName}\n${serveeAddress}` 
}

//Helper functions to get Case Info
function getMatterNum() {
  return getFormValue('#matterNumber')
}

function getCaseNum() {
  return getFormValue('#caseNum').toUpperCase()
}

function getCourtInfo() {
  return getFormValue('#courtInfo')
}

function getCounty() {
  const courtInfo = splitAtNewLineAndTrim('#courtInfo')
  const court = courtInfo[0].split('for')
  const county = court[1].trim()
  return county
}

function getCourt() {
  const courtInfo = splitAtNewLineAndTrim('#courtInfo')
  return courtInfo[0]
}

function getCourtAddress() {
  const courtInfo = splitAtNewLineAndTrim('#courtInfo')
  const courtAddress = courtInfo.slice(1).join('\n')
  return courtAddress
}

//Helper functions to get misc form info
function getServiceType() {
  return getFormValue('#txServiceType')
}

async function getDocReturnMethod() {
  const serviceType = getFormValue('#txServiceType')
  const returnMethod = getFormValue('#txDocReturnMethod')
  const nickname = getFormValue('#customerEmail')
  let email = ""
  try {
    if (nickname !== "") {
      const res = await fetch(`/customer/${nickname}`)
      const data = await res.json()
      email = data.email
    }
    if (serviceType === 'sheriff' || serviceType === 'constable') {
      return `Dispatch all documents to the ${serviceType} for service`
    } else if (returnMethod === 'Email to ') {
        return `${returnMethod}${email}`
    } else {
        return returnMethod
    }
    
  } catch (err) {
    console.log(err)
  }
}

function getDate() {
  return new Date().toLocaleDateString()
}

/*Clear form fields*/
document.querySelector('#resetTxLetForm').addEventListener('click', clearFields)

function clearFields() {
  document.querySelector('#courtInfo').value = ""
  document.querySelector('#matterNumber').value = ""
  document.querySelector('#caseNum').value = ""
  document.querySelector('#plaintiffName').value = ""
  document.querySelector('#defendantName').value = ""
  document.querySelector('#servee1Name').value = ""
  document.querySelector('#servee1Address').value = ""
  document.querySelector('#servee2Name').value = ""
  document.querySelector('#servee2Address').value = ""
  document.querySelector('#txServiceType').value = ""
  document.querySelector('#txDocReturnMethod').value = ""
  document.querySelector('#customerEmail').value = ""
  document.querySelector('#txAliasTemplate').value = ""
}