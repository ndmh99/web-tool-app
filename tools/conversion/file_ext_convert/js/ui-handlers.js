// UI and Event Handlers
// =========================
//
// This file handles UI logic, button creation, and state updates.
//
// MAINTAINER GUIDE:
// - To change UI behavior: Edit buildButtons, showMsg, clearMsg, etc.
// - To add new UI features: Add new functions for tooltips, modals, or advanced previews.
// - For accessibility: Ensure ARIA attributes and keyboard navigation are handled here.
// - All DOM element references are checked for existence before use.
//
// Example: To change the look of conversion option buttons, update buildButtons.
//
// For more, see EXTERNAL_MODULES.txt for a full guide.
//
// VISUAL/INSTRUCTIONAL CUES:
// - All user-facing messages and UI updates are handled via showMsg, clearMsg, clearPreview, and progress helpers.
// - All UI logic is modular and can be extended for new features.
//
// =========================

/**
 * Dynamically builds radio button options for a list of file extensions and appends them to the given grid element.
 * @param {string[]} list - Array of file extensions.
 * @param {HTMLElement} grid - The grid element to append buttons to.
 * Defensive: clears grid before adding new buttons.
 */
function buildButtons(list, grid) {
  grid.innerHTML = '';
  list.forEach(ext => {
    const label = document.createElement('label');
    label.className = 'relative cursor-pointer';
    label.innerHTML = `
      <input type="radio" name="targetExt" value="${ext}" class="hidden">
      <span class="block w-full text-center py-2 rounded-md border border-gray-300 transition-colors">
        .${ext}
      </span>
    `;
    grid.appendChild(label);
  });
}

/**
 * Shows a message in the result container. If isErr is true, styles as an error.
 * @param {string} html - The message HTML to display.
 * @param {boolean} [isErr=false] - Whether to style as an error.
 */
function showMsg(html, isErr = false) {
  resultContainer.innerHTML = html;
  resultContainer.classList.remove('hidden');
  resultContainer.className = `p-4 rounded-md border text-center font-medium break-words transition-all ${isErr ? 'bg-red-50 border-red-200 text-red-700' : 'bg-indigo-50 border-indigo-200 text-indigo-900'}`;
}

/**
 * Hides the result message container.
 */
function clearMsg() { resultContainer.classList.add('hidden'); }

/**
 * Hides and clears the preview container.
 */
function clearPreview() { previewContainer.classList.add('hidden'); previewContainer.innerHTML = ''; }

/**
 * Shows or hides the progress bar and status text.
 * @param {boolean} show - Whether to show the progress bar.
 */
function showProgress(show) {
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
  progressBar.style.width = `${percent}%`;
  statusText.textContent = message || `Processing: ${percent}%`;
}

/**
 * Handles file selection, updates UI and available conversion options.
 * Reads the selected file and updates the UI accordingly.
 * Defensive: disables convert button and resets UI if no file is selected.
 */
function handleFileSelection() {
  // Clear previous messages and preview, hide progress bar
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