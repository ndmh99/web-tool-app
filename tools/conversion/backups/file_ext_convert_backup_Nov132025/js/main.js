// Main Entry Point
// =========================
//
// This file initializes the app, sets up event listeners, and coordinates the conversion process.
//
// MAINTAINER GUIDE:
// - To change app workflow: Edit event listeners or the main conversion handler (handleConvertClick).
// - To add new event handlers: Add listeners for new UI elements here.
// - To integrate new conversions: Add logic in the main handler, using helpers/utilities as needed.
// - To change startup logic: Modify the initial state setup.
// - All DOM element references are checked for existence before use.
//
// Example: To add a new button for batch conversion, add the button in HTML and add an event listener here.
//
// For more, see EXTERNAL_MODULES.txt for a full guide.
//
// VISUAL/INSTRUCTIONAL CUES:
// - All user-facing messages and UI updates are handled via showMsg, clearMsg, clearPreview, and progress helpers.
// - All conversion logic is delegated to helpers/utilities for modularity.
//
// =========================

// --- Import constants and helpers ---
// (Assume all helpers/constants are globally available or imported via <script> tags)

/**
 * Main entry point: Initializes UI, event handlers, and state.
 * All logic is wrapped in DOMContentLoaded to ensure elements exist.
 * All DOM references are checked for null before use.
 */
document.addEventListener('DOMContentLoaded', function() {
  // DOM references
  const dropZone         = document.getElementById('dropZone');
  const fileInput        = document.getElementById('fileInput');
  const importedFilename = document.getElementById('importedFilename');
  const convertBtn       = document.getElementById('convertBtn');
  const resultContainer  = document.getElementById('resultContainer');
  const previewContainer = document.getElementById('previewContainer');
  const statusContainer  = document.getElementById('statusContainer');
  const progressBar      = document.getElementById('progressBar');
  const statusText       = document.getElementById('statusText');
  const panel            = document.getElementById('panel');
  const imageGrid        = document.getElementById('imageGrid');
  const docGrid          = document.getElementById('docGrid');
  const archiveGrid      = document.getElementById('archiveGrid');

  // --- UI Button Initialization ---
  // Dynamically build radio button options for each file type group.
  if (imageGrid) buildButtons(imageTypes, imageGrid);
  if (docGrid) buildButtons(docTypes, docGrid);
  if (archiveGrid) buildButtons(archiveTypes, archiveGrid);

  // --- Event Handlers ---
  // Drag-and-drop, file input, and convert button logic.
  if (dropZone && fileInput) {
    ['dragenter', 'dragover'].forEach(evt => {
      dropZone.addEventListener(evt, e => { e.preventDefault(); dropZone.classList.add('drop-active'); });
    });
    ['dragleave', 'dragend', 'drop'].forEach(evt => {
      dropZone.addEventListener(evt, e => { e.preventDefault(); dropZone.classList.remove('drop-active'); });
    });
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        handleFileSelection();
      }
    });
    dropZone.addEventListener('click', function (e) {
      if (e.target !== fileInput) { fileInput.click(); }
      e.stopPropagation();
    });
    fileInput.addEventListener('click', function(e) { e.stopPropagation(); });
    fileInput.addEventListener('change', handleFileSelection);
  }
  if (convertBtn) convertBtn.addEventListener('click', handleConvertClick);

  // --- UI/State Helpers ---

  /**
   * Shows a message in the result container. If isErr is true, styles as an error.
   * @param {string} html - The message HTML to display.
   * @param {boolean} [isErr=false] - Whether to style as an error.
   */
  function showMsg(html, isErr = false) {
    if (!resultContainer) return;
    resultContainer.innerHTML = html;
    resultContainer.classList.remove('hidden');
    resultContainer.className = `p-4 rounded-md border text-center font-medium break-words transition-all ${isErr ? 'bg-red-50 border-red-200 text-red-700' : 'bg-indigo-50 border-indigo-200 text-indigo-900'}`;
  }

  /**
   * Hides the result message container.
   */
  function clearMsg() { if (resultContainer) resultContainer.classList.add('hidden'); }

  /**
   * Hides and clears the preview container.
   */
  function clearPreview() { if (previewContainer) { previewContainer.classList.add('hidden'); previewContainer.innerHTML = ''; } }

  /**
   * Shows or hides the progress bar and status text.
   * @param {boolean} show - Whether to show the progress bar.
   */
  function showProgress(show) {
    if (!statusContainer || !progressBar || !statusText) return;
    statusContainer.classList.toggle('hidden', !show);
    if (show) {
      progressBar.style.width = '0%';
      statusText.textContent = 'Starting conversion...';
    }
  }

  /**
   * Updates the progress bar and status text with the given percent and message.
   * @param {number} percent - Progress percentage (0-100).
   * @param {string} [message] - Optional status message.
   */
  function updateProgress(percent, message) {
    if (!progressBar || !statusText) return;
    progressBar.style.width = `${percent}%`;
    statusText.textContent = message || `Processing: ${percent}%`;
  }

  /**
   * Handles file selection, updates UI and available conversion options.
   * Reads the selected file and updates the UI accordingly.
   * Defensive: disables convert button and resets UI if no file is selected.
   */
  function handleFileSelection() {
    clearMsg();
    clearPreview();
    showProgress(false);
    // Defensive: If no file is selected, reset UI and disable convert button
    if (!fileInput.files.length) {
      importedFilename.value = '';
      convertBtn.disabled = true;
      document.getElementById('supportedExtSection').classList.remove('hidden'); // Show supported extensions section
      updateConversionOptions(null); // Reset conversion options
      panel.classList.remove('file-selected'); // Remove file-selected visual state
      return;
    }
    // Get the selected file and update UI state for a valid selection
    const file = fileInput.files[0];
    importedFilename.value = file.name; // Show filename in input
    convertBtn.disabled = false; // Enable convert button
    document.getElementById('supportedExtSection').classList.add('hidden'); // Hide supported extensions section
    updateConversionOptions(file.name); // Update available conversion options
    panel.classList.add('file-selected'); // Visually mark panel as having a file
  }

  /**
   * Updates which conversion options are enabled based on the selected file's extension.
   * @param {string|null} filename - The selected file's name, or null to enable all options.
   * Defensive: disables all options if no file is selected.
   */
  function updateConversionOptions(filename) {
    // Defensive: If no filename, enable all options in all grids
    if (!filename) {
      function enableAll(grid) {
        grid.querySelectorAll('label').forEach(label => {
          const radio = label.querySelector('input[type="radio"]');
          const span = label.querySelector('span');
          radio.disabled = false; // Enable radio button
          span.classList.remove('disabled-btn'); // Remove disabled style
          span.classList.remove('animate-pulse-fade'); // Remove highlight
        });
      }
      enableAll(imageGrid);
      enableAll(docGrid);
      enableAll(archiveGrid);
      return;
    }
    // Get file extension and allowed options for conversion
    const srcExt = filename.split('.').pop().toLowerCase();
    const allowedOptions = conversionMap[srcExt] || [];
    const allowedArchive = conversionMap['*'];

    /**
     * Updates the enabled/disabled state of radio button options in a grid based on allowed file extensions.
     * For each label in the grid, enables the radio and adds a highlight if allowed, otherwise disables and dims it.
     * @param {HTMLElement} grid - The grid containing radio button labels.
     * @param {string[]} allowedList - List of allowed file extensions for conversion.
     */
    function updateGrid(grid, allowedList) {
      grid.querySelectorAll('label').forEach(label => {
        const radio = label.querySelector('input[type="radio"]');
        const span = label.querySelector('span');
        if (allowedList.includes(radio.value)) {
          radio.disabled = false; // Enable radio for allowed extension
          span.classList.remove('disabled-btn'); // Remove disabled style
          span.classList.add('animate-pulse-fade'); // Add highlight for allowed
        } else {
          radio.disabled = true; // Disable radio for disallowed extension
          span.classList.remove('animate-pulse-fade'); // Remove highlight
          span.classList.add('disabled-btn'); // Add disabled style
          radio.checked = false; // Uncheck if previously selected
        }
      });
    }

    // Update each grid with allowed options based on file extension
    if (imageTypes.includes(srcExt) || heicSources.includes(srcExt)) {
      updateGrid(imageGrid, allowedOptions);
    } else {
      updateGrid(imageGrid, []);
    }

    if (docTypes.includes(srcExt) || pdfDocx.includes(srcExt)) {
      updateGrid(docGrid, allowedOptions);
    } else {
      updateGrid(docGrid, []);
    }

    updateGrid(archiveGrid, allowedArchive);
  }

  /**
   * Main conversion handler: runs when the user clicks Convert. Handles all conversion logic and UI updates.
   * Reads the selected file, determines the conversion type, and updates the UI with the result or error.
   * Defensive: disables convert button during processing, shows errors, and always re-enables UI.
   * @returns {Promise<void>}
   */
  async function handleConvertClick() {
    // Clear previous messages and preview, show progress bar
    clearMsg();
    clearPreview();
    showProgress(true);
    // Defensive: If no file is selected, exit early
    if (!fileInput.files.length) return;
    // Get file and extension info
    const file = fileInput.files[0];
    const srcName = file.name;
    const srcExt = srcName.split('.').pop().toLowerCase();
    // Get selected target extension from UI
    const targetExt = document.querySelector('input[name="targetExt"]:checked')?.value;
    // Validate target extension
    if (!targetExt) {
      showMsg('Pick a target extension.', true);
      showProgress(false);
      return;
    }
    // Prevent converting to the same extension
    if (srcExt === targetExt) {
      showMsg('Source and target extensions are identical.', true);
      showProgress(false);
      return;
    }
    // Show UI animation and disable convert button during processing
    panel.classList.add('animate-pulse-fade');
    convertBtn.disabled = true;
    try {
      let convertedBlob = null;
      updateProgress(10, 'Starting conversion...');
      // --- IMAGE CONVERSIONS ---
      // HEIC/HEIF to image
      if ((heicSources.includes(srcExt)) && imageTypes.includes(targetExt)) {
        if (typeof heic2any === 'undefined') { throw new Error('heic2any not loaded'); }
        updateProgress(30, 'Converting HEIC image...');
        const toMime = targetExt === 'png' ? 'image/png' : (targetExt === 'gif' ? 'image/gif' : 'image/jpeg');
        const qualitySetting = (targetExt === 'gif') ? undefined : 0.92;
        const result = await heic2any({ blob: file, toType: toMime, quality: qualitySetting });
        convertedBlob = Array.isArray(result) ? result[0] : result;
        updateProgress(100, 'Conversion complete!');
      }
      // Standard image-to-image conversion
      else if (imageTypes.includes(srcExt) && imageTypes.includes(targetExt)) {
        convertedBlob = await convertImage(file, targetExt);
      }
      // --- DATA CONVERSIONS (CSV, JSON, XML) ---
      else if ((srcExt === 'csv' && (targetExt === 'json' || targetExt === 'xml')) ||
               (srcExt === 'json' && (targetExt === 'csv' || targetExt === 'xml')) ||
               (srcExt === 'xml' && (targetExt === 'json' || targetExt === 'csv'))) {
        updateProgress(30, 'Converting data format...');
        const text = await file.text();
        let data;
        // Parse source data
        if (srcExt === 'csv') {
          data = csvToJson(text);
        } else if (srcExt === 'json') {
          data = JSON.parse(text);
        } else if (srcExt === 'xml') {
          data = xmlToJson(text);
        }
        // Convert to target format
        let convertedText;
        if (targetExt === 'json') {
          convertedText = JSON.stringify(data, null, 2);
        } else if (targetExt === 'csv') {
          convertedText = jsonToCsv(data);
        } else if (targetExt === 'xml') {
          convertedText = jsonToXml(data);
        }
        convertedBlob = new Blob([convertedText], { type: 'text/plain' });
        updateProgress(100, 'Conversion complete!');
      }
      // --- TEXT/HTML/MARKDOWN CONVERSIONS ---
      else if ((srcExt === 'html' && (targetExt === 'md' || targetExt === 'txt')) ||
               (srcExt === 'md' && (targetExt === 'html' || targetExt === 'txt')) ||
               (srcExt === 'txt' && (targetExt === 'html' || targetExt === 'md'))) {
        updateProgress(30, 'Converting text document...');
        const text = await file.text();
        let convertedText = text;
        // Convert between HTML, Markdown, and Text
        if (srcExt === 'html' && targetExt === 'md') {
          convertedText = htmlToMarkdown(text);
        } else if (srcExt === 'md' && targetExt === 'html') {
          convertedText = markdownToHtml(text);
        } else if (srcExt === 'txt' && targetExt === 'html') {
          convertedText = txtToHtml(text);
        } else if (srcExt === 'html' && targetExt === 'txt') {
          convertedText = htmlToTxt(text);
        } else if (srcExt === 'md' && targetExt === 'txt') {
          convertedText = markdownToTxt(text);
        } else if (srcExt === 'txt' && targetExt === 'md') {
          convertedText = txtToMarkdown(text);
        }
        convertedBlob = new Blob([convertedText], { type: 'text/plain' });
        updateProgress(100, 'Conversion complete!');
      }
      // --- PDF/DOCX TO TEXT/HTML ---
      else if ((srcExt === 'pdf' || srcExt === 'docx') && (targetExt === 'txt' || targetExt === 'html')) {
        updateProgress(30, 'Converting document...');
        if (srcExt === 'pdf') {
          convertedBlob = await convertPdfToTextOrHtml(file, targetExt);
        } else {
          convertedBlob = await convertDocxToTextOrHtml(file, targetExt);
        }
        updateProgress(100, 'Conversion complete!');
      }
      // --- HTML/MD/TXT TO PDF ---
      else if ((srcExt === 'html' || srcExt === 'md' || srcExt === 'txt') && targetExt === 'pdf') {
        updateProgress(30, 'Converting to PDF...');
        const text = await file.text();
        convertedBlob = await htmlToPdf(text);
        updateProgress(100, 'Conversion complete!');
      }
      // --- DOCX TO PDF ---
      else if (srcExt === 'docx' && targetExt === 'pdf') {
        updateProgress(30, 'Converting DOCX to PDF using docx-preview and html2pdf...');
        try {
          // Dynamically load docx-preview if not present
          if (typeof docx === 'undefined') {
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = 'https://cdn.jsdelivr.net/npm/docx-preview/dist/docx-preview.min.js';
              script.onload = resolve;
              script.onerror = () => reject(new Error('Failed to load docx-preview library'));
              document.head.appendChild(script);
            });
          }
          // Render DOCX to HTML in a container for PDF conversion
          clearPreview();
          const container = document.createElement('div');
          container.id = 'docxPdfContainer';

          const arrayBuffer = await file.arrayBuffer();
          await docx.renderAsync(arrayBuffer, container, null, { breakPages: true});
          updateProgress(60, 'Rendering complete. Generating PDF...');
          // Convert rendered HTML to PDF
          convertedBlob = await html2pdf().from(container)
            .set({
              margin: [0.5, 0, 0.5, 0],
              filename: srcName.replace(/\.[^.]+$/, '.pdf'),
              html2canvas: {
                scale: 3,
                logging: false,
                letterRendering: true,
                useCORS: true,
                x : 'data-html2canvas-ignore',
                y: 'data-html2canvas-ignore',
              },
              jsPDF: {
                unit: 'in',
                format: 'Letter',
                orientation: 'portrait'
              }
            })
            .outputPdf('blob');
          updateProgress(100, 'Conversion complete!');
        } catch (err) {
          console.error('DOCX to PDF conversion error:', err);
          throw new Error('DOCX to PDF conversion failed.');
        }
      }
      // --- ARCHIVE CREATION (ZIP/TAR) ---
      else if (targetExt === 'zip') {
        updateProgress(30, 'Creating ZIP archive...');
        if (typeof JSZip === 'undefined') { throw new Error('JSZip library not loaded'); }
        const zip = new JSZip();
        updateProgress(50, 'Adding file to archive...');
        zip.file(file.name, file);
        updateProgress(70, 'Generating ZIP file...');
        convertedBlob = await zip.generateAsync({ type: "blob" });
        updateProgress(100, 'Archive created!');
      }
      else if (targetExt === 'tar') {
        updateProgress(30, 'Creating TAR archive...');
        convertedBlob = await createTarFromFile(file);
        updateProgress(100, 'Archive created!');
      }
      // --- UNSUPPORTED CONVERSION ---
      else { throw new Error('This conversion pair is not supported in the browser.'); }

      // --- SHOW RESULT AND PREVIEW ---
      // Build download link and preview for converted file
      const base = srcName.replace(/\.[^.]+$/, '');
      const newName = `${base}.${targetExt}`;
      const url = URL.createObjectURL(convertedBlob);
      showMsg(`Converted to: <strong>${newName}</strong>`);
      const dl = document.createElement('a');
      dl.href = url; dl.download = newName;
      dl.className = 'inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md btn-click';
      dl.innerHTML = '<i class="fas fa-download"></i> Download';
      previewContainer.appendChild(dl);
      // Show image preview if applicable
      if (imageTypes.includes(targetExt) && convertedBlob.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = url;
        img.className = 'max-h-96 mx-auto rounded-md shadow';
        previewContainer.appendChild(img);
      } else if (docTypes.includes(targetExt) || pdfDocx.includes(targetExt)) {
        // Show PDF preview in iframe, or text/HTML preview
        if (targetExt === 'pdf') {
          const url = URL.createObjectURL(convertedBlob);
          const iframe = document.createElement('iframe');
          iframe.src = url;
          iframe.type = 'application/pdf';
          iframe.className = 'w-full h-96 rounded-md border';
          iframe.style.border = 'none';
          previewContainer.appendChild(iframe);
        } else {
          const text = await convertedBlob.text();
          const previewElement = document.createElement(targetExt === 'html' ? 'div' : 'pre');
          if (targetExt === 'html') {
            previewElement.innerHTML = text;
          } else {
            previewElement.textContent = text;
          }
          previewElement.className = 'max-h-96 overflow-auto p-4 bg-gray-50 border rounded-md text-left whitespace-pre-wrap';
          previewContainer.appendChild(previewElement);
        }
      }
      previewContainer.classList.remove('hidden');
      previewContainer.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      // Show error message and log for debugging
      console.error("Conversion Error:", err);
      showMsg(`Conversion error: ${err.message || 'Unknown error'}.`, true);
    } finally {
      // Always re-enable UI and update progress
      panel.classList.remove('animate-pulse-fade');
      convertBtn.disabled = false;
      updateProgress(100, 'Done');
    }
  }

  // --- Initial State ---
  // On load, reset UI and conversion options.
  handleFileSelection();
});
