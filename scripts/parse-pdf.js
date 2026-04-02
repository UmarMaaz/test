import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import PdfParse from 'pdf-parse';

async function parsePDF() {
  try {
    // Read the PDF file from the attachments
    const pdfPath = path.join(process.cwd(), 'public', 'test.pdf');
    
    // If the file doesn't exist, we'll fetch it from the URL or use sample content
    let dataBuffer;
    
    if (fs.existsSync(pdfPath)) {
      dataBuffer = fs.readFileSync(pdfPath);
    } else {
      // Fallback: use the PDF from the read-only context
      console.log('PDF file not found in public directory.');
      console.log('You will need to manually copy the test.pdf file to public/test.pdf');
      console.log('For now, we will create sample MCQ data.');
      return;
    }

    const pdf = await PdfParse(dataBuffer);
    const text = pdf.text;
    
    // Save extracted text
    fs.writeFileSync(
      path.join(process.cwd(), 'lib', 'pdf-content.txt'),
      text
    );
    
    console.log('PDF parsed successfully!');
    console.log(`Extracted ${text.length} characters`);
    
  } catch (error) {
    console.error('Error parsing PDF:', error.message);
  }
}

parsePDF();
