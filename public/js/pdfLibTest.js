const { PDFDocument, StandardFonts, rgb } = PDFLib

document.querySelector('#create').addEventListener('click', fillForm)

async function fillForm() {
  //Get form
  //const template = getTemplate()
  const template = await fetch(`tx/${getTemplate()}`)
  const templateData = await template.json()
  const formUrl = `/templates/tx-templates/${templateData.fileName}.pdf`
  const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
  // console.log(formPdfBytes)
  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const form = pdfDoc.getForm()

  //Get the form fields
  const caseNumField = form.getTextField('caseNumber')
  const servee1AddField = form.getTextField('servee1')
  const servee2AddField = form.getTextField('servee2')
  const courtInfo = form.getTextField('courtInfo')
  const partiesAndCourt = form.getTextField('partiesAndCourt')
  const serviceType = form.getTextField('serviceType')
  const docReturnType = form.getTextField('docReturnType')
  const matterNum = form.getTextField('matterNumber')
  const generatedDate = form.getTextField('generateDate')

  //Fill out the form fields
  caseNumField.setText(getCaseNum())
  courtInfo.setText(`Clerk of the Court\n${getCounty()}, Texas\n${getCourtAddress()}`)
  partiesAndCourt.setText(`${getPlaintiff()} vs. ${getDefendant()}; ${getCourt()}`)
  servee1AddField.setText(getServee1Info())
  servee2AddField.setText(getServee2Info())
  caseNumField.setText(getCaseNum())
  serviceType.setText(`Please issue a separate Citation for each defendant for service by a ${getServiceType()}`)
  docReturnType.setText(getDocReturnMethod())
  matterNum.setText(`Matter Number: ${getMatterNum()}`)
  generatedDate.setText(`Generated: ${getDate()}`)

  //Convert pdf to format viewable in an iframe and display in iframe
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  document.getElementById('pdftestpreview').src = pdfDataUri;

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
  return getFormValue('#txTemplate')
}

function getPlaintiff() {
  return getFormValue('#plaintiffNameTest').toUpperCase()
}

function getDefendant() {
  return getFormValue('#defendantNameTest').toUpperCase()
}

function getServee1Info() {
  const serveeAddress = getFormValue('#serveeAddressTest').toUpperCase()
  const serveeName = getFormValue(`#serveeNameTest`).toUpperCase()
  return `${serveeName}\n${serveeAddress}`
}

function getServee2Info() {
  const serveeAddress = getFormValue('#servee2AddressTest').toUpperCase()
  const serveeName = getFormValue('#servee2NameTest').toUpperCase()
  return `${serveeName}\n${serveeAddress}` 
}

function getCaseNum() {
  return document.querySelector('#caseNumTest').value.toUpperCase()
}

function getCourtInfo() {
  return document.querySelector('#courtInfoTest').value
}

function getServiceType() {
  return getFormValue('#txServiceTypeTest')
}

function getDocReturnMethod() {
  const serviceType = getFormValue('#txServiceTypeTest')
  const returnMethod = getFormValue('#txDocReturnMethodTest')

  if (serviceType === 'sheriff' || serviceType === 'constable') {
      return `Dispatch all documents to the ${serviceType} for service`
  } else if (returnMethod === 'Email to ') {
      return `${returnMethod}${getFormValue('#customerEmailTest')}`
  } else {
      return returnMethod
  }
}

function getMatterNum() {
  return getFormValue('#matterNumberTest')
}

function getCounty() {
  const courtInfo = splitAtNewLineAndTrim('#courtInfoTest')
  const court = courtInfo[0].split('for')
  const county = court[1].trim()
  return county
}

function getCourt() {
  const courtInfo = splitAtNewLineAndTrim('#courtInfoTest')
  return courtInfo[0]
}

function getCourtAddress() {
  const courtInfo = splitAtNewLineAndTrim('#courtInfoTest')
  const courtAddress = courtInfo.slice(1).join('\n')
  return courtAddress
}

function getDate() {
  return new Date().toLocaleDateString()
}