import PdfDocument from "pdfkit";

// Fixed function name and typos
export const pdfDownload = async (req, res) => {
  try {
    const { result, topics = [] } = req.body;

    if (!result) {
      return res.status(400).json({ error: "No Content Provided" });
    }

    const doc = new PdfDocument({ margin: 40 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ExamNotesAI.pdf"'
    );

    doc.pipe(res);
    doc.fontSize(20).text("ExamNotes AI", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Importance: ${result.importance || "N/A"}`);
    doc.moveDown();
    doc.fontSize(16).text("Sub Topics");

    topics.forEach((t) => {
      doc.fontSize(12).text(`* ${t}`); // Fixed fontSixe typo and template literal syntax
    });

    doc.moveDown();
    doc.fontSize(16).text("Notes");
    doc.moveDown();
    doc.fontSize(16).text("Revision Notes");
    doc.moveDown();
    doc.fontSize(16).text("Important Questions");
    doc.moveDown();
    doc.fontSize(16).text("Short Questions");
    doc.moveDown();
    doc.fontSize(16).text("Diagram Questions");
    doc.moveDown();

    doc.end();
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error generating PDF: ${error.message}` }); // Fixed empty catch block
  }
};
