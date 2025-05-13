// Constants and Configuration
// =========================
//
// This file defines all supported file types and the conversion map for the app.
//
// - To add a new file type: Add it to the relevant array (e.g., imageTypes, docTypes).
// - To change what conversions are allowed: Edit the conversionMap object.
// - To remove a file type: Remove it from the arrays and conversionMap.
//
// Example: To add BMP image support, add 'bmp' to imageTypes and update conversionMap accordingly.
//
// For more, see EXTERNAL_MODULES.txt for a full guide.

/**
 * Defines all supported file type arrays and the conversion map for the app.
 *
 * Logic:
 * - imageTypes: Supported image file extensions.
 * - heicSources: HEIC/HEIF image extensions (special handling).
 * - docTypes: Supported document file extensions.
 * - pdfDocx: Special document types that require unique conversion logic.
 * - archiveTypes: Supported archive file extensions.
 * - conversionMap: Maps each extension to allowed target extensions for conversion.
 *
 * Usage:
 * - To add a new file type, add it to the relevant array and update conversionMap.
 * - To change allowed conversions, edit conversionMap.
 * - To remove a file type, remove it from arrays and conversionMap.
 */
const imageTypes   = ['jpg', 'jpeg', 'png', 'webp', 'gif']; // Supported image formats
const heicSources  = ['heic', 'heif']; // HEIC/HEIF formats
const docTypes     = ['html', 'md', 'txt', 'csv', 'json', 'xml', 'pdf']; // Document formats
const pdfDocx      = ['pdf', 'docx']; // Special document formats
const archiveTypes = ['zip', 'tar']; // Archive formats
const conversionMap = {
  'jpg':    imageTypes.filter(t => t !== 'jpg'), // jpg can convert to all other images
  'jpeg':   imageTypes.filter(t => t !== 'jpeg'),
  'png':    imageTypes.filter(t => t !== 'png'),
  'webp':   imageTypes.filter(t => t !== 'webp'),
  'gif':    imageTypes.filter(t => t !== 'gif'),
  'heic':   ['jpg', 'png', 'webp'], // HEIC/HEIF to common images
  'heif':   ['jpg', 'png', 'webp'],
  'html':   ['md', 'txt', 'pdf'], // HTML to Markdown, Text, PDF
  'md':     ['html', 'txt', 'pdf'], // Markdown to HTML, Text, PDF
  'txt':    ['html', 'md', 'pdf'], // Text to HTML, Markdown, PDF
  'csv':    ['json', 'xml'], // CSV to JSON, XML
  'json':   ['csv', 'xml'], // JSON to CSV, XML
  'xml':    ['json', 'csv'], // XML to JSON, CSV
  'pdf':    ['txt', 'html'], // PDF to Text, HTML
  'docx':   ['txt', 'html', 'pdf'], // DOCX to Text, HTML, PDF
  '*':      ['zip', 'tar'] // Any file to archive
};
