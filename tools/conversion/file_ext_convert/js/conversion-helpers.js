// Conversion Helper Functions
// =========================
//
// This file provides helper functions for file conversions (images, documents, PDF, DOCX, TAR, etc.).
//
// - To add a new conversion: Write a new function (e.g., convertSvgToPng) and integrate it in main.js.
// - To improve conversion quality: Tweak canvas/image logic, PDF rendering, or text extraction as needed.
// - To use a new library: Add its <script> in index.html and use it here.
//
// Example: To add SVG to PNG conversion, add convertSvgToPng and update main.js to use it.
//
// For more, see EXTERNAL_MODULES.txt for a full guide.

/**
 * Converts a Markdown string to HTML.
 * Uses marked.js if available for full Markdown support, otherwise falls back to simple <br> replacement.
 * @param {string} md - The Markdown input string.
 * @returns {string} HTML string.
 *
 * Logic:
 * - If marked.js is loaded, use it for full Markdown parsing.
 * - Otherwise, simply replace newlines with <br> for basic formatting.
 */
function markdownToHtml(md) {
  // If marked.js is available, use it for advanced Markdown parsing
  if (typeof marked !== 'undefined') {
    return marked.parse(md);
  }
  // Fallback: replace newlines with <br> for basic line breaks
  return md.replace(/\n/g, '<br>');
}

/**
 * Converts HTML to Markdown.
 * Uses TurndownService if available for accurate conversion, otherwise strips tags and replaces <br> with newlines.
 * @param {string} html - The HTML input string.
 * @returns {string} Markdown string.
 *
 * Logic:
 * - If TurndownService is loaded, use it for accurate HTML-to-Markdown conversion.
 * - Adds custom rules for underline, strikethrough, tables, and code blocks.
 * - Removes scripts, styles, and hidden elements for clean output.
 * - If not available, strips all HTML tags and replaces <br> with newlines.
 */
function htmlToMarkdown(html) {
  if (typeof TurndownService !== 'undefined') {
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
    });
    turndownService.addRule('underline', {
      filter: ['u'],
      replacement: function(content) { return '__' + content + '__'; }
    });
    turndownService.addRule('strikethrough', {
      filter: ['s', 'del', 'strike'],
      replacement: function(content) { return '~~' + content + '~~'; }
    });
    turndownService.addRule('table', {
      filter: 'table',
      replacement: function(content, node) {
        let md = '';
        const rows = Array.from(node.querySelectorAll('tr'));
        rows.forEach((row, i) => {
          const cells = Array.from(row.children).map(cell => turndownService.turndown(cell.innerHTML).replace(/\|/g, '\\|'));
          md += '| ' + cells.join(' | ') + ' |\n';
          if (i === 0) md += '| ' + cells.map(() => '---').join(' | ') + ' |\n';
        });
        return md;
      }
    });
    turndownService.addRule('preCode', {
      filter: function(node) {
        return (
          node.nodeName === 'PRE' &&
          node.firstChild && node.firstChild.nodeName === 'CODE'
        );
      },
      replacement: function(content, node) {
        return '\n```' + (node.firstChild.getAttribute('class') || '') + '\n' + node.firstChild.textContent + '\n```\n';
      }
    });
    const temp = document.createElement('div');
    temp.innerHTML = html;
    temp.querySelectorAll('script, style, [hidden], [aria-hidden="true"]').forEach(el => el.remove());
    return turndownService.turndown(temp.innerHTML);
  }
  // Fallback: strip tags and replace <br> with newlines
  return html.replace(/<br\s*\/?>(?!\n)/gi, '\n').replace(/<[^>]+>/g, '');
}

/**
 * Converts HTML to plain text, preserving table and block structure.
 * Removes scripts, styles, and hidden elements for clean output.
 * @param {string} html - The HTML input string.
 * @returns {string} Plain text string.
 *
 * Logic:
 * - Parse HTML into a temporary DOM element.
 * - Remove scripts, styles, and hidden elements.
 * - Convert tables to text with pipes and newlines.
 * - Add newlines after block elements for readability.
 * - Collapse multiple newlines and trim whitespace.
 */
function htmlToTxt(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  temp.querySelectorAll('script, style, [hidden], [aria-hidden="true"]').forEach(el => el.remove());
  temp.querySelectorAll('table').forEach(table => {
    let txt = '';
    table.querySelectorAll('tr').forEach(row => {
      const cells = Array.from(row.children).map(cell => cell.textContent.trim());
      txt += cells.join(' | ') + '\n';
    });
    table.replaceWith(document.createTextNode(txt));
  });
  temp.querySelectorAll('p, br, div, li, h1, h2, h3, h4, h5, h6').forEach(el => {
    el.insertAdjacentText('afterend', '\n');
  });
  let text = temp.textContent || temp.innerText || '';
  text = text.replace(/\n{3,}/g, '\n\n').replace(/[ \t]+\n/g, '\n').trim();
  return text;
}

/**
 * Converts plain text to HTML by wrapping in <pre> and escaping angle brackets.
 * @param {string} txt - The plain text input.
 * @returns {string} HTML string.
 *
 * Logic:
 * - Escapes < and > to prevent HTML injection.
 * - Wraps the text in a <pre> tag to preserve whitespace and formatting.
 */
function txtToHtml(txt) {
  return `<pre>${txt.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`;
}

/**
 * Converts Markdown to plain text by stripping formatting and links.
 * Removes images, links, and Markdown syntax for a clean text output.
 * @param {string} md - The Markdown input string.
 * @returns {string} Plain text string.
 *
 * Logic:
 * - Remove image and link syntax.
 * - Remove Markdown formatting characters.
 * - Collapse multiple newlines and trim whitespace.
 */
function markdownToTxt(md) {
  return md
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[#>*_`~\-]+/g, '')
    .replace(/\n{2,}/g, '\n\n')
    .trim();
}

/**
 * Returns the input text as Markdown (identity function for plain text).
 * @param {string} txt - The plain text input.
 * @returns {string} Markdown string (same as input).
 *
 * Logic:
 * - No transformation; returns the input as-is.
 */
function txtToMarkdown(txt) {
  return txt;
}

/**
 * Converts HTML to a PDF Blob using html2pdf.js.
 * Accepts options for filename, margins, and rendering settings.
 * @param {string} html - The HTML input string.
 * @param {object} options - PDF generation options.
 * @returns {Promise<Blob>} PDF file as a Blob.
 *
 * Logic:
 * - Cleans the HTML by removing scripts, styles, and hidden elements.
 * - Sets up PDF options (margins, filename, rendering scale, etc.).
 * - Uses html2pdf.js to generate a PDF Blob from the HTML content.
 */
async function htmlToPdf(html, options = {}) {
  if (typeof html2pdf === 'undefined') throw new Error('html2pdf.js not loaded');
  const temp = document.createElement('div');
  temp.innerHTML = html;
  temp.querySelectorAll('script, style, [hidden], [aria-hidden="true"]').forEach(el => el.remove());
  const pdfOptions = {
    margin: options.margin || [0.5, 0.5, 0.5, 0.5],
    filename: options.filename || 'document.pdf',
    html2canvas: {
      scale: options.scale || 3,
      logging: false,
      letterRendering: true,
      useCORS: true,
      x : 'data-html2canvas-ignore',
      y: 'data-html2canvas-ignore',
      ...options.html2canvas
    },
    jsPDF: {
      unit: 'in',
      format: options.format || 'a4',
      orientation: options.orientation || 'portrait',
      ...options.jsPDF
    }
  };
  return await html2pdf().from(temp.innerHTML).set(pdfOptions).outputPdf('blob');
}

/**
 * Converts an image file to another image format using a canvas.
 * Supports jpg, png, webp, gif. Returns a Blob of the converted image.
 * @param {File} file - The source image file.
 * @param {string} targetExt - The target image extension.
 * @returns {Promise<Blob>} Converted image Blob.
 *
 * Logic:
 * - Loads the image into an <img> element.
 * - Draws the image onto a canvas.
 * - Converts the canvas to the target format using toBlob.
 */
async function convertImage(file, targetExt) {
  const img = document.createElement('img');
  await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; img.src = URL.createObjectURL(file); });
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  canvas.getContext('2d').drawImage(img, 0, 0);
  let mimeType, quality;
  switch (targetExt) {
    case 'jpg':
    case 'jpeg': mimeType = 'image/jpeg'; quality = 0.92; break;
    case 'png': mimeType = 'image/png'; quality = undefined; break;
    case 'webp': mimeType = 'image/webp'; quality = 0.92; break;
    case 'gif': mimeType = 'image/gif'; quality = undefined; break;
    default: mimeType = 'image/jpeg'; quality = 0.92;
  }
  return new Promise(resolve => { canvas.toBlob(blob => { resolve(blob); }, mimeType, quality); });
}

/**
 * Extracts text or HTML from a PDF file using pdfjsLib.
 * Handles multi-page PDFs and basic bullet/line structure.
 * @param {File} file - The PDF file.
 * @param {string} targetExt - 'txt' or 'html'.
 * @returns {Promise<Blob>} Converted text or HTML Blob.
 *
 * Logic:
 * - Loads the PDF using pdfjsLib.
 * - Iterates through each page, extracting text content.
 * - Handles bullet points and line breaks for better readability.
 * - Returns either plain text or HTML wrapped in <pre>.
 */
async function convertPdfToTextOrHtml(file, targetExt) {
  if (window['pdfjsLib']) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
  }
  const arrayBuffer = await file.arrayBuffer();
  let textContent = '';
  try {
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const text = await page.getTextContent();
      let lastY = null, line = [];
      text.items.forEach(item => {
        let str = item.str;
        if (/^[\u2022\u2023\u25E6\u2043\u2219\*-]/.test(str.trim())) {
          str = '\n- ' + str.trim().replace(/^[-*\u2022\u2023\u25E6\u2043\u2219]+\s*/, '');
        }
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 2) {
          textContent += line.join(' ') + '\n';
          line = [];
        }
        line.push(str);
        lastY = item.transform[5];
      });
      if (line.length) textContent += line.join(' ') + '\n';
      textContent += '\n';
    }
    if (!textContent.trim()) {
      textContent = '[This PDF contains only images or scanned pages.]';
    }
    if (targetExt === 'txt') {
      return new Blob([textContent], { type: 'text/plain' });
    } else if (targetExt === 'html') {
      const htmlContent = `<pre>${textContent}</pre>`;
      return new Blob([htmlContent], { type: 'text/html' });
    }
    throw new Error('Unsupported PDF conversion target');
  } catch (err) {
    throw new Error('Failed to extract text from PDF: ' + err.message);
  }
}

/**
 * Converts a DOCX file to text or HTML using docx-preview and mammoth.
 * Handles basic formatting and extracts raw text or HTML.
 * @param {File} file - The DOCX file.
 * @param {string} targetExt - 'txt' or 'html'.
 * @returns {Promise<Blob>} Converted text or HTML Blob.
 *
 * Logic:
 * - Loads the DOCX file as an ArrayBuffer.
 * - For HTML: uses docx-preview to render the document and extract HTML.
 * - For TXT: uses mammoth to extract raw text, normalizes whitespace.
 */
async function convertDocxToTextOrHtml(file, targetExt) {
  const arrayBuffer = await file.arrayBuffer();
  if (typeof docx === 'undefined') {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/docx-preview/dist/docx-preview.min.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load docx-preview library'));
      document.head.appendChild(script);
    });
  }
  if (targetExt === 'html') {
    const tempContainer = document.createElement('div');
    await docx.renderAsync(arrayBuffer, tempContainer, null, { breakPages: true });
    let htmlContent = tempContainer.innerHTML;
    const styleTags = tempContainer.querySelectorAll('style');
    let styles = '';
    styleTags.forEach(style => { styles += style.outerHTML; });
    if (styles) {
      htmlContent = styles + htmlContent;
    }
    tempContainer.remove();
    return new Blob([htmlContent], { type: 'text/html' });
  } else if (targetExt === 'txt') {
    const result = await mammoth.extractRawText({ arrayBuffer });
    let normalizedText = result.value
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/^(\s*[-*]\s+)/gm, match => '  ' + match)
      .trim();
    return new Blob([normalizedText], { type: 'text/plain' });
  }
  throw new Error('Unsupported DOCX conversion target');
}

/**
 * Creates a TAR archive from a single file.
 * Builds a valid TAR header and appends the file data and padding.
 * @param {File} file - The file to archive.
 * @returns {Promise<Blob>} TAR archive as a Blob.
 *
 * Logic:
 * - Creates a 512-byte TAR header with file metadata.
 * - Appends the file data, padding, and two 512-byte end blocks.
 * - Returns the result as a Blob.
 */
async function createTarFromFile(file) {
  const fileData = await file.arrayBuffer();
  const header = new Uint8Array(512);
  const encoder = new TextEncoder();
  const nameBytes = encoder.encode(file.name);
  header.set(nameBytes.slice(0, 100), 0);
  const sizeStr = fileData.byteLength.toString(8).padStart(11, '0') + ' ';
  header.set(encoder.encode(sizeStr), 124);
  header.set(encoder.encode('0000644 '), 100);
  header.set(encoder.encode('00000000000 '), 136);
  header.set(encoder.encode('0'), 156);
  let checksum = 0;
  for (let i = 0; i < 512; i++) { checksum += header[i]; }
  const checksumStr = checksum.toString(8).padStart(6, '0') + '\0 ';
  header.set(encoder.encode(checksumStr), 148);
  const paddingSize = 512 - (fileData.byteLength % 512 || 512);
  const padding = new Uint8Array(paddingSize);
  const endBlocks = new Uint8Array(1024);
  const tarData = new Uint8Array(header.byteLength + fileData.byteLength + padding.byteLength + endBlocks.byteLength);
  tarData.set(header, 0);
  tarData.set(new Uint8Array(fileData), header.byteLength);
  tarData.set(padding, header.byteLength + fileData.byteLength);
  tarData.set(endBlocks, header.byteLength + fileData.byteLength + padding.byteLength);
  return new Blob([tarData], { type: 'application/x-tar' });
}
