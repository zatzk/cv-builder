import pdfService from '../services/pdf.service.js';



export const generatePDF = async (req, res) => {
  try {
    // Set response headers for PDF streaming
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');


    // Create PDF stream
    const pdfStream = pdfService.createPdfStream();
    
    // Pipe the PDF stream to the response
    pdfStream.pipe(res); 

    // Handle incoming data from client
    req.on('data', (chunk) => {
      try {
        const data = JSON.parse(chunk.toString());
        pdfService.addContentToPdf(pdfStream, data);
      } catch (parseError) {
        req.destroy(); // Destroy the request stream on error
      }
    });

    // Handle request completion
    req.on('end', () => {
      pdfService.finalizePdf(pdfStream); // Finalize the PDF stream
    });

    // Handle client disconnection
    req.on('close', () => {
      pdfService.abortPdfGeneration(pdfStream); // Abort PDF generation if client disconnects
    })

  } catch (error) {
    console.error("Error in generatePDF controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}