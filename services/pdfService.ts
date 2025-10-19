// @ts-nocheck
// Since we are using CDNs, we need to tell TypeScript to ignore the lack of type definitions for these global libraries.

/**
 * Downloads a given HTML element as a single-page A4 PDF.
 * It uses html2canvas to capture the element at a high resolution and jspdf to create the PDF.
 * @param element - The HTMLElement to be captured and converted to PDF.
 */
export const downloadResumeAsPDF = async (element: HTMLElement): Promise<void> => {
    // A4 page dimensions in millimeters
    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;

    // Use html2canvas to render the element to a canvas
    const canvas = await html2canvas(element, {
        // Increase scale for better resolution in the PDF
        scale: 4,
        // Ensure it captures the background colors and images
        useCORS: true,
        backgroundColor: '#ffffff',
    });

    // Get the image data from the canvas as a JPEG
    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    // Create a new jsPDF instance in portrait mode, using millimeters, for an A4-sized page
    const pdf = new jspdf.jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
    });

    // Add the captured image to the PDF, fitting it to the full A4 page
    pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);

    // Trigger the browser to download the generated PDF
    pdf.save('resume.pdf');
};
