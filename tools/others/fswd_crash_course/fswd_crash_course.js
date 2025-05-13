// fswd_crash_course.js

// ---------- DATA ----------
const syllabus = [
  { week: 1, title: "Foundations & Front-end Basics", lessons: [
      { id: "htmlcss", name: "1.1. Advanced HTML/CSS & Responsive Layouts", yt: "D-h8L5hgW-w" },
      { id: "jsfund", name: "1.2. JavaScript Fundamentals in 90 Minutes", yt: "PkZNo7MFNFg" },
      { id: "reactIntro", name: "1.3. React Basics – Components, State, Props", yt: "bMknfKXIFA8" }
    ] },
  { week: 2, title: "Back-end with Node & Express", lessons: [
      { id: "nodeCrash", name: "2.1. Node.js Crash Course", yt: "fBNz5xF-Kx4" },
      { id: "expressRoutes", name: "2.2. Express.js & RESTful Routing", yt: "L72fhGm1tfE" },
      { id: "mongodb", name: "2.3. MongoDB & Mongoose Intro", yt: "-56x56UppqQ" }
    ] },
  { week: 3, title: "Full-Stack Integration & Deployment", lessons: [
      { id: "mernCrash", name: "3.1. Building a MERN App End-to-End", yt: "7CqJlxBYj-M" },
      { id: "auth", name: "3.2. JWT Authentication Flow", yt: "ngc9gnGgUdA" },
      { id: "deploy", name: "3.3. Deploy MERN to Heroku", yt: "71wSzpLyW9k" }
    ] }
];

// ---------- RENDER ----------
const courseEl = document.getElementById('course');
syllabus.forEach(({ week, title, lessons }) => {
  const details = document.createElement('details');
  details.className = 'week';
  details.innerHTML = `<summary>Week ${week}: ${title}</summary>`;
  lessons.forEach(ls => {
    const div = document.createElement('div');
    div.className = 'lesson';
    const thumbUrl = `https://img.youtube.com/vi/${ls.yt}/hqdefault.jpg`;
    div.innerHTML = `
      <h3>${ls.name}</h3>
      <div class="video-placeholder" data-yt="${ls.yt}" style="position:relative;width:100%;height:315px;cursor:pointer;background:#000;overflow:hidden;border-radius:4px;">
        <img src="${thumbUrl}" alt="Video thumbnail" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.7);display:block;">
        <svg viewBox="0 0 68 48" width="68" height="48" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">
          <rect
            x="2"
            y="2"
            width="64"
            height="44"
            rx="10"
            ry="10"
            fill="#212121"
            fill-opacity="0.8"
          />
          <path d="M45 24 27 14v20z" fill="#fff"/>
        </svg>
      </div>
      <div class="notes-toolbar">
        <button type="button" class="toolbar-btn" data-action="bold" title="Bold (Ctrl+B)"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><text x="3" y="15" font-size="14" font-weight="bold" fill="currentColor">B</text></svg></button>
        <button type="button" class="toolbar-btn" data-action="italic" title="Italic (Ctrl+I)"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><text x="5" y="15" font-size="14" font-style="italic" fill="currentColor">I</text></svg></button>
        <button type="button" class="toolbar-btn" data-action="underline" title="Underline (Ctrl+U)"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><text x="2" y="15" font-size="14" text-decoration="underline" fill="currentColor">U</text></svg></button>
        <button type="button" class="toolbar-btn" data-action="strikethrough" title="Strikethrough"><svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="14" fill="currentColor" style="text-decoration:line-through">S</text></svg></button>
        <button type="button" class="toolbar-btn" data-action="highlight" title="Highlight"><svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="10" width="14" height="5" rx="1" fill="yellow"/></svg></button>
        <button type="button" class="toolbar-btn" data-action="removeformat" title="Remove Format"><svg width="18" height="18" viewBox="0 0 18 18"><line x1="3" y1="15" x2="15" y2="3" stroke="currentColor" stroke-width="2"/><text x="3" y="15" font-size="14" fill="currentColor">F</text></svg></button>
        <span class="toolbar-separator"></span>
        <button type="button" class="toolbar-btn" data-action="bullet" title="Bullet List"><svg width="18" height="18" viewBox="0 0 18 18"><circle cx="6" cy="9" r="2" fill="currentColor"/><rect x="10" y="8" width="6" height="2" rx="1" fill="currentColor"/></svg></button>
        <button type="button" class="toolbar-btn" data-action="numbered" title="Numbered List"><svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="14" font-size="12" fill="currentColor">1.</text><rect x="10" y="8" width="6" height="2" rx="1" fill="currentColor"/></svg></button>
        <span class="toolbar-separator"></span>
        <button type="button" class="toolbar-btn" data-action="heading" title="Heading"><svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="14" font-weight="bold" fill="currentColor">H</text></svg></button>
        <button type="button" class="toolbar-btn" data-action="quote" title="Quote"><svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="14" fill="currentColor">❝</text></svg></button>
        <button type="button" class="toolbar-btn" data-action="code" title="Inline Code"><svg width="18" height="18" viewBox="0 0 18 18"><rect x="3" y="6" width="12" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="7" y="9" width="4" height="2" rx="1" fill="currentColor"/></svg></button>
        <button type="button" class="toolbar-btn" data-action="link" title="Insert Link"><svg width="18" height="18" viewBox="0 0 18 18"><path d="M7 11a3 3 0 0 1 0-4l2-2a3 3 0 1 1 4 4l-1 1" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M11 7a3 3 0 0 1 0 4l-2 2a3 3 0 1 1-4-4l1-1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></button>
        <span style="flex:1 1 auto;"></span>
        <button type="button" class="toolbar-btn" data-action="clear" title="Clear All Text">Clear</button>
      </div>
      <div class="notes-area" contenteditable="true" data-key="${ls.id}" style="width:100%;height:120px;padding:.6rem;border:1px solid var(--border);border-radius:4px;background:var(--card);color:var(--text);resize:vertical;overflow:auto;" aria-label="Lesson notes" data-placeholder="Write your notes here. Use the toolbar above for formatting."></div>
      <div class="notes-hint" style="font-size:0.97em;color:var(--accent);margin-bottom:2px;opacity:0.85;">Tip: Use the toolbar above to format your notes. Click 'Save Notes' to store them.</div>
      <div class="btn-row">
        <button class="btn save" data-key="${ls.id}">Save Notes</button>
        <button class="btn secondary download" data-key="${ls.id}">Download Notes</button>
        <button class="btn progress-finish-btn">Mark as Finished</button>
      </div>`;
    details.appendChild(div);
  });
  courseEl.appendChild(details);
})

// ---------- ALL NOTES SECTION ----------
const allNotesSection = document.createElement('section');
allNotesSection.className = 'all-notes-section-global';
allNotesSection.style = 'margin:2.5rem 0 2rem 0;padding:1.5rem;background:var(--card);border:2px solid var(--border);border-radius:8px;';
allNotesSection.innerHTML = `<h2 style="font-size:1.2rem;margin-bottom:1rem;">All Saved Notes</h2><div class="all-notes-list-global"></div>`;
courseEl.appendChild(allNotesSection);

function renderAllNotes() {
  const notesDiv = document.querySelector('.all-notes-list-global');
  if (!notesDiv) return;
  let notes = [];
  syllabus.forEach(week => {
    week.lessons.forEach(lesson => {
      const key = 'note_' + lesson.id;
      const val = localStorage.getItem(key);
      if (val && val.trim()) {
        notes.push({
          week: week.week,
          lesson: lesson.name,
          value: val,
          id: lesson.id
        });
      }
    });
  });
  if (notes.length === 0) {
    notesDiv.innerHTML = '<em>No notes saved yet.</em>';
    return;
  }
  notesDiv.innerHTML = notes.map(n => `
    <div style="margin-bottom:1.2rem;padding-bottom:1rem;border-bottom:1px solid var(--border);">
      <div style="font-weight:600;">Week ${n.week} – ${n.lesson}</div>
      <div style="background:var(--bg);padding:0.7em 1em;border-radius:4px;margin:0.5em 0 0.3em 0;max-height:220px;overflow:auto;">
        ${n.value}
      </div>
      <button class="btn secondary download-note-btn" data-key="${n.id}" style="font-size:0.95em;margin:5px;padding:5px">Download</button>
      <button class="btn secondary delete-note-btn" data-key="${n.id}" style="font-size:0.95em;margin:5px;padding:5px;color:#d32f2f;border-color:#d32f2f">Delete</button>
    </div>
  `).join('');
}

// ---------- NOTES LOGIC ----------
function loadNotes() {
  document.querySelectorAll('.notes-area').forEach(t => {
    const saved = localStorage.getItem('note_' + t.dataset.key);
    if (saved) t.innerHTML = saved;
  });
  setNotesPlaceholders();
}
loadNotes();

document.addEventListener('click', e => {
  if (e.target.classList.contains('save')) {
    const key = e.target.dataset.key;
    const html = document.querySelector(`.notes-area[data-key="${key}"]`).innerHTML;
    if (!html.trim() || html.trim() === '<span style="pointer-events:none;opacity:0.5;">Write your notes here. Use the toolbar above for formatting.</span>') {
      toast('No notes to save!', 'red');
      return;
    }
    localStorage.setItem('note_' + key, html);
    toast('Saved!');
    renderAllNotes();
  }
  if (e.target.classList.contains('download')) {
    const key = e.target.dataset.key;
    const html = document.querySelector(`.notes-area[data-key="${key}"]`).innerHTML;
    if (!html.trim() || html.trim() === '<span style="pointer-events:none;opacity:0.5;">Write your notes here. Use the toolbar above for formatting.</span>') {
      toast('No notes to download!', 'red');
      return;
    }
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${key}-notes.html`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
  // Add: Download from all notes section
  if (e.target.classList.contains('download-note-btn')) {
    const key = e.target.dataset.key;
    // Try to get from notes area if present, else from localStorage
    let html = '';
    const notesArea = document.querySelector(`.notes-area[data-key="${key}"]`);
    if (notesArea) {
      html = notesArea.innerHTML;
    } else {
      html = localStorage.getItem('note_' + key) || '';
    }
    if (!html.trim() || html.trim() === '<span style="pointer-events:none;opacity:0.5;">Write your notes here. Use the toolbar above for formatting.</span>') {
      toast('No notes to download!', 'red');
      return;
    }
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${key}-notes.html`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
});

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-note-btn')) {
    if (!confirm('Are you sure you want to delete this note? This cannot be undone.')) {
      e.preventDefault();
      return;
    }
    const key = e.target.dataset.key;
    localStorage.removeItem('note_' + key);
    const notesDiv = document.querySelector(`.notes-area[data-key="${key}"]`);
    if (notesDiv) notesDiv.innerHTML = '';
    renderAllNotes();
    toast('Note deleted!');
  }
});

function setNotesPlaceholders() {
  document.querySelectorAll('.notes-area').forEach(div => {
    const placeholder = div.getAttribute('data-placeholder') || '';
    function showPlaceholder() {
      if (!div.textContent.trim() && !div.innerHTML.includes('<img')) {
        div.classList.add('empty');
        div.setAttribute('data-show-placeholder', 'true');
        div.innerHTML = `<span style='pointer-events:none;opacity:0.5;'>${placeholder}</span>`;
      }
    }
    function hidePlaceholder() {
      if (div.getAttribute('data-show-placeholder') === 'true') {
        div.innerHTML = '';
        div.classList.remove('empty');
        div.removeAttribute('data-show-placeholder');
      }
    }
    div.addEventListener('focus', hidePlaceholder);
    div.addEventListener('blur', showPlaceholder);
    div.addEventListener('input', function() {
      if (div.getAttribute('data-show-placeholder') === 'true') hidePlaceholder();
    });
    if (!div.innerHTML.trim()) showPlaceholder();
  });
}
setNotesPlaceholders();

// ---------- VIDEO PLACEHOLDER ----------
courseEl.addEventListener('click', function(e) {
  const ph = e.target.closest('.video-placeholder');
  if (ph && !ph.classList.contains('loaded')) {
    const yt = ph.dataset.yt;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${yt}?rel=0&autoplay=1`;
    iframe.loading = 'lazy';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '315px';
    iframe.style.border = '0';
    iframe.style.borderRadius = '4px';
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity .5s';
    ph.replaceWith(iframe);
    setTimeout(() => { iframe.style.opacity = '1'; }, 30);
  }
});

// ---------- THEME TOGGLE ----------
const btn = document.getElementById('themeToggle');
btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  btn.textContent = dark ? 'Light Mode' : 'Dark Mode';
});

// ---------- MINI TOAST ----------
function toast(msg, bgColor = 'var(--accent)') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `
    position:fixed;
    bottom:20px;
    right:20px;
    background:${bgColor}; /* Use provided or default color */
    color:#fff;
    padding:.6rem 1rem;
    border-radius:4px;
    opacity:0;
    transition:opacity .3s;
  `;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.style.opacity = 1);
  setTimeout(() => { 
    t.style.opacity = 0; 
    setTimeout(() => t.remove(), 300); 
  }, 1300);
}

// ---------- PROGRESSION BAR LOGIC ----------
const flatLessons = syllabus.flatMap(w => w.lessons.map(l => ({ ...l, week: w.week })));

function renderProgressBar() {
  const bar = document.getElementById('progress-bar');
  const progress = getProgress();
  bar.innerHTML = `<div id="progress-bar-minimal">
    <div class="progress-bar-line"></div>
    <div class="progress-bar-line-fill" style="width:${progress === 0 ? 0 : ((progress) / (flatLessons.length - 1)) * 100}%"></div>
    ${flatLessons.map((ls, i) => `
      <div class="progress-bar-node${progress > i ? ' done' : progress === i ? ' active' : ''}"
        data-title="${ls.name.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"
        style="left:calc(${(i / (flatLessons.length - 1)) * 100}% - 11px);position:absolute;"
        tabindex="0"
        role="button"
        aria-label="${ls.name.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}">
        ${progress > i ? '<span class="check">&#10003;</span>' : `<span class="node-number">${i + 1}</span>`}
      </div>
    `).join('')}
  </div>`;
}

const style = document.createElement('style');
style.textContent = `.progress-bar-node.done { background: #4caf50 !important; border-color: #4caf50 !important; color: #fff !important; }`;
document.head.appendChild(style);

function getProgress() {
  let idx = 0;
  for (; idx < flatLessons.length; idx++) {
    if (!localStorage.getItem('lesson_done_' + flatLessons[idx].id)) break;
  }
  return idx;
}

function markLessonDone(idx) {
  localStorage.setItem('lesson_done_' + flatLessons[idx].id, '1');
}

function isLessonDone(idx) {
  return !!localStorage.getItem('lesson_done_' + flatLessons[idx].id);
}

renderProgressBar();

// ---------- CUSTOM TOOLTIP FOR PROGRESSION BAR NODES ----------
(function progressionBarTooltip() {
  let tooltip = null;
  let hideTimeout = null;

  function showTooltip(node) {
    if (tooltip) tooltip.remove();
    if (hideTimeout) clearTimeout(hideTimeout);
    tooltip = document.createElement('div');
    tooltip.className = 'progress-tooltip';
    tooltip.textContent = node.getAttribute('data-title');
    tooltip.style.position = 'fixed';
    tooltip.style.zIndex = 9999;
    tooltip.style.background = 'var(--card, #222)';
    tooltip.style.color = 'var(--text, #fff)';
    tooltip.style.padding = '7px 14px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.boxShadow = '0 2px 12px rgba(0,0,0,0.18)';
    tooltip.style.fontSize = '1em';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.transition = 'opacity .2s';
    tooltip.style.opacity = '0';
    document.body.appendChild(tooltip);
    // Position above or below node, fit in viewport
    const rect = node.getBoundingClientRect();
    const tRect = tooltip.getBoundingClientRect();
    let top = rect.top - tRect.height - 8;
    if (top < 0) top = rect.bottom + 8;
    let left = rect.left + rect.width / 2 - tRect.width / 2;
    if (left < 4) left = 4;
    if (left + tRect.width > window.innerWidth - 4) left = window.innerWidth - tRect.width - 4;
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    requestAnimationFrame(() => tooltip.style.opacity = 1);
    // Hide after 2.2s
    hideTimeout = setTimeout(hideTooltip, 2200);
  }
  function hideTooltip() {
    if (tooltip) {
      tooltip.style.opacity = 0;
      setTimeout(() => { if (tooltip) tooltip.remove(); tooltip = null; }, 200);
    }
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  document.addEventListener('click', function(e) {
    const node = e.target.closest('.progress-bar-node');
    if (node) {
      showTooltip(node);
      e.preventDefault();
      e.stopPropagation();
    } else {
      hideTooltip();
    }
  });
  // Hide tooltip on scroll, resize, or pressing Escape
  window.addEventListener('scroll', hideTooltip, true);
  window.addEventListener('resize', hideTooltip);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') hideTooltip();
  });
  // Remove browser tooltip on hover
  document.addEventListener('mouseover', function(e) {
    const node = e.target.closest('.progress-bar-node');
    if (node) node.removeAttribute('title');
  });
})();

// ---------- PROGRESSION BUTTONS & INTEGRATION ----------
function renderProgressionButtons() {
  const lessonDivs = document.querySelectorAll('.lesson');
  lessonDivs.forEach((div, idx) => {
    let btn = div.querySelector('.progress-finish-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'btn progress-finish-btn';
      btn.style.marginTop = '0.5rem';
      btn.textContent = isLessonDone(idx) ? 'Finished' : 'Mark as Finished';
      div.appendChild(btn);
    }
    btn.disabled = idx > getProgress();
    btn.textContent = idx > getProgress() ? 'Unavailable to Mark' : (isLessonDone(idx) ? 'Finished' : 'Mark as Finished');
    btn.style.background = idx > getProgress() ? '#b0b0b0' : (isLessonDone(idx) ? '#4caf50' : '#aa0d0d');
    btn.style.color = '#fff';
    btn.style.cursor = idx > getProgress() ? 'not-allowed' : 'pointer'; // Change cursor appearance
  });
}

courseEl.addEventListener('click', function(e) {
  if (e.target.classList.contains('progress-finish-btn')) {
    const lessonDivs = Array.from(document.querySelectorAll('.lesson'));
    const idx = lessonDivs.indexOf(e.target.closest('.lesson'));
    if (idx === getProgress()) {
      markLessonDone(idx);
      renderProgressBar();
      renderProgressionButtons();
      toast('Lesson ' + flatLessons[idx].name + ' marked as finished!','#4caf50');
    }
    else {
      toast('This lesson has been finished!', 'red');
    }
  }
});

const clearBtn = document.getElementById('clearProgressionBtn');
clearBtn.addEventListener('click', function() {
  if (!confirm('Are you sure you want to clear all progression? This cannot be undone.')) {
    return;
  }
  flatLessons.forEach(ls => {
    localStorage.removeItem('lesson_done_' + ls.id);
  });
  renderProgressBar();
  renderProgressionButtons();
  toast('Progression cleared!');
});

renderProgressionButtons();
window.addEventListener('storage', () => {
  renderProgressBar();
  renderProgressionButtons();
});

renderAllNotes();

// ---------- UNDO/REDO FOR NOTES ----------
const notesHistory = {};
const notesRedo = {};

document.addEventListener('input', function(e) {
  if (e.target.classList.contains('notes-area')) {
    const key = e.target.dataset.key;
    if (!notesHistory[key]) notesHistory[key] = [];
    notesHistory[key].push(e.target.innerHTML);
    // Clear redo stack on new input
    notesRedo[key] = [];
  }
});

document.addEventListener('keydown', function(e) {
  if (e.target.classList.contains('notes-area')) {
    const key = e.target.dataset.key;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      // Undo
      if (notesHistory[key] && notesHistory[key].length > 1) {
        notesRedo[key] = notesRedo[key] || [];
        notesRedo[key].push(notesHistory[key].pop());
        e.target.innerHTML = notesHistory[key][notesHistory[key].length - 1];
        e.preventDefault();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      // Redo
      if (notesRedo[key] && notesRedo[key].length > 0) {
        const redoVal = notesRedo[key].pop();
        notesHistory[key].push(redoVal);
        e.target.innerHTML = redoVal;
        e.preventDefault();
      }
    }
  }
});

// Initialize history for loaded notes
function initNotesHistory() {
  document.querySelectorAll('.notes-area').forEach(div => {
    const key = div.dataset.key;
    notesHistory[key] = [div.innerHTML];
    notesRedo[key] = [];
  });
}
initNotesHistory();

// ---------- FORMATTING TOOLBAR LOGIC ----------
document.addEventListener('click', function(e) {
  // Ensure toolbar button clicks work for SVG or child elements inside the button
  let btn = e.target;
  while (btn && !btn.classList?.contains('toolbar-btn') && btn !== document.body) {
    btn = btn.parentNode;
  }
  if (btn && btn.classList && btn.classList.contains('toolbar-btn')) {
    const action = btn.dataset.action;
    const notesDiv = btn.closest('.lesson').querySelector('.notes-area');
    if (!notesDiv) return;

    // Save current selection
    let selection = window.getSelection();
    let range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    if (action === 'clear') {
      notesDiv.innerHTML = '';
      notesDiv.focus();
      return;
    }

    notesDiv.focus();

    // Restore selection if available
    if (range) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    document.execCommand('styleWithCSS', false, true);

    // Helper: check if selection is inside a tag
    function isTagActive(tag, styleCheck) {
      if (!selection.anchorNode) return false;
      let node = selection.anchorNode;
      while (node && node !== notesDiv) {
        if (node.nodeType === 1 && node.nodeName === tag) {
          if (!styleCheck || styleCheck(node)) return true;
        }
        node = node.parentNode;
      }
      return false;
    }

    if (action === 'bold') {
      if (isTagActive('B') || isTagActive('STRONG')) {
        document.execCommand('removeFormat');
      } else {
        document.execCommand('bold');
      }
    } else if (action === 'italic') {
      if (isTagActive('I') || isTagActive('EM')) {
        document.execCommand('removeFormat');
      } else {
        document.execCommand('italic');
      }
    } else if (action === 'underline') {
      if (isTagActive('U')) {
        document.execCommand('removeFormat');
      } else {
        document.execCommand('underline');
      }
    } else if (action === 'strikethrough') {
      if (isTagActive('S') || isTagActive('STRIKE')) {
        document.execCommand('removeFormat');
      } else {
        document.execCommand('strikeThrough');
      }
    } else if (action === 'highlight') {
      // Toggle highlight: if selection is highlighted, remove it
      let highlighted = false;
      if (selection.anchorNode) {
        let node = selection.anchorNode;
        while (node && node !== notesDiv) {
          if (node.nodeType === 1 && (node.style && (node.style.backgroundColor === 'yellow' || node.style.background === 'yellow'))) {
            highlighted = true;
            break;
          }
          node = node.parentNode;
        }
      }
      if (highlighted) {
        document.execCommand('removeFormat');
      } else {
        // Apply highlight with better contrast for dark mode
        const span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
        span.style.color = 'black'; // Ensure text is readable
        range.surroundContents(span);
      }
    } else if (action === 'removeformat') {
      document.execCommand('removeFormat');
    } else if (action === 'bullet') {
      document.execCommand('insertUnorderedList');
    } else if (action === 'numbered') {
      document.execCommand('insertOrderedList');
    } else if (action === 'heading') {
      // Toggle heading: if selection is in h3, remove, else apply
      if (isTagActive('H3')) {
        document.execCommand('formatBlock', false, 'div');
      } else {
        document.execCommand('formatBlock', false, '<h3>');
      }
    } else if (action === 'quote') {
      // Toggle quote: if selection is in blockquote, unwrap; else, wrap
      function unwrapBlockquote(node) {
        if (!node) return;
        if (node.nodeName === 'BLOCKQUOTE') {
          // Replace blockquote with its children
          const parent = node.parentNode;
          while (node.firstChild) parent.insertBefore(node.firstChild, node);
          parent.removeChild(node);
        }
      }
      if (range && !range.collapsed) {
        // Check if selection is fully inside a blockquote
        let common = range.commonAncestorContainer;
        let blockquote = common.nodeType === 1 && common.nodeName === 'BLOCKQUOTE'
          ? common
          : null;
        if (!blockquote) {
          // Try to find blockquote up from startContainer
          let node = range.startContainer;
          while (node && node !== notesDiv) {
            if (node.nodeType === 1 && node.nodeName === 'BLOCKQUOTE') {
              blockquote = node;
              break;
            }
            node = node.parentNode;
          }
        }
        if (blockquote) {
          // Unwrap blockquote(s) in selection
          // Expand selection to cover the blockquote
          selection.removeAllRanges();
          const newRange = document.createRange();
          newRange.selectNode(blockquote);
          selection.addRange(newRange);
          unwrapBlockquote(blockquote);
        } else {
          // Wrap selection in blockquote
          const blockquote = document.createElement('blockquote');
          blockquote.style.margin = '0.5em 0';
          blockquote.style.padding = '0.5em 1em';
          blockquote.style.borderLeft = '3px solid var(--accent, #2196f3)';
          blockquote.style.background = 'var(--bg, #f5f5f5)';
          blockquote.appendChild(range.extractContents());
          range.insertNode(blockquote);
          // Move cursor after blockquote
          range.setStartAfter(blockquote);
          range.setEndAfter(blockquote);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    } else if (action === 'code') {
      // Toggle code: if selection is in pre, remove, else apply
      if (isTagActive('PRE')) {
        document.execCommand('formatBlock', false, 'div');
      } else {
        document.execCommand('formatBlock', false, '<pre>');
      }
    } else if (action === 'link') {
      let url = prompt('Enter URL:');
      if (url) {
        if (!/^https?:\/\//i.test(url)) url = 'http://' + url;
        document.execCommand('createLink', false, url);
      }
    }
    // Push new state to undo history
    const key = notesDiv.dataset.key;
    if (key) {
      if (!notesHistory[key]) notesHistory[key] = [];
      notesHistory[key].push(notesDiv.innerHTML);
      notesRedo[key] = [];
    }
  }
});

// ---------- ACCESSIBILITY ENHANCEMENTS ----------
// Accessibility: Add ARIA roles/labels and keyboard navigation
(function enhanceAccessibility() {
  // Toolbar ARIA
  document.querySelectorAll('.notes-toolbar').forEach(toolbar => {
    toolbar.setAttribute('role', 'toolbar');
    toolbar.querySelectorAll('.toolbar-btn').forEach(btn => {
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('role', 'button');
      // Keyboard activation
      btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  });
  // Progression bar ARIA
  const bar = document.getElementById('progress-bar');
  if (bar) {
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Course Progression Bar');
    bar.querySelectorAll('.progress-bar-node').forEach((node, idx) => {
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'button');
      node.setAttribute('aria-label', node.getAttribute('title') || `Lesson ${idx + 1}`);
      node.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          node.click();
        }
      });
    });
  }
})();
