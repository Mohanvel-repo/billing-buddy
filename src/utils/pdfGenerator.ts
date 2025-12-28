import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (elementId: string, fileName: string): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  // Higher scale for better clarity and sharpness
  const scale = 3;

  // Capture the element as canvas with improved settings
  const canvas = await html2canvas(element, {
    scale: scale,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    allowTaint: true,
  });

  // A4 dimensions in mm
  const a4Width = 210;
  const a4Height = 297;

  // Create PDF with A4 size
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // Calculate the proper dimensions maintaining aspect ratio
  const imgWidth = a4Width;
  const imgHeight = (canvas.height * a4Width) / canvas.width;

  // Get image data with high quality
  const imgData = canvas.toDataURL('image/png', 1.0);

  // Calculate total pages needed
  const totalPages = Math.ceil(imgHeight / a4Height);

  for (let page = 0; page < totalPages; page++) {
    if (page > 0) {
      pdf.addPage();
    }

    // Calculate vertical offset for each page
    const yOffset = -(page * a4Height);

    // Add the image with proper positioning
    pdf.addImage(
      imgData,
      'PNG',
      0,
      yOffset,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    );
  }

  // Download PDF with proper filename
  pdf.save(`${fileName}.pdf`);
};
