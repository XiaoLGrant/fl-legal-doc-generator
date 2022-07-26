// const { PDFDocument, StandardFonts } = require('pdf-lib');

// document.querySelector('#pdfLibTestCreate').addEventListener('click', createPdf)

// async function createPdf() {
//     const pdfDoc = await PDFDocument.create()
//     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  
//     const page = pdfDoc.addPage()
//     const { width, height } = page.getSize()
//     const fontSize = 30
//     page.drawText(summonsBody, {
//       x: 50,
//       y: height - 4 * fontSize,
//       size: fontSize,
//       font: timesRomanFont,
//       color: rgb(0, 0.53, 0.71),
//     })
  
//     fs.writeFileSync("./output.pdf", await page.save())

//     // const pdfBytes = await pdfDoc.save()
//     // download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
//   }

  const summonsBody = 'This is a test for summonsssssssss'