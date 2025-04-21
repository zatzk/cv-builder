import PDFDocument from "pdfkit";

class pdfService {
  createPdfStream() {
    const doc = new PDFDocument();
    // PDF default settings
    doc.fontSize(12).font("Helvetica");
    return doc;
  }

  addContentToPdf(doc, data) {
    // Customize based on data structure

    doc.text(data.content);

    // dynamic elements
    if (data.addPage) {
      doc.addPage();
    }

    if (data.image) {
      doc.image(data.image, { fit: [500, 400] });
    }
  }

  finalizePdf(doc) {
    doc.end();
  }

  abortPdfGeneration(doc) {
    doc.end();
  }

}
export default new pdfService();