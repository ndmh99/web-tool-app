// Data Conversion Utilities
// =========================
//
// This file contains utility functions for converting between data formats (CSV, JSON, XML, etc.).
//
// MAINTAINER GUIDE:
// - To add a new data conversion: Write a new function (e.g., yamlToJson).
// - To improve parsing/formatting: Edit the relevant function for better accuracy or edge case handling.
// - All functions are globally available if loaded via <script>.
// - All parsing/formatting logic is modular and can be extended for new formats.
//
// Example: To add YAML support, add yamlToJson and jsonToYaml functions here.
//
// For more, see EXTERNAL_MODULES.txt for a full guide.
//
// VISUAL/INSTRUCTIONAL CUES:
// - All conversion helpers are pure functions and do not interact with the DOM.
// - Each function is documented with JSDoc and logic explanations for maintainers.
//
// =========================

/**
 * Converts a CSV string to a JSON array of objects.
 * Assumes the first line contains headers.
 * Defensive: trims whitespace and handles empty input.
 * @param {string} csv - The CSV input string.
 * @returns {Array<Object>} Array of objects representing the CSV rows.
 */
function csvToJson(csv) {
  // Split CSV into lines and extract headers
  const lines = csv.trim().split(/\r?\n/);
  if (!lines.length) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  // Map each line to an object using headers
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] ? values[i].trim() : '';
    });
    return obj;
  });
}

/**
 * Converts a JSON array of objects to a CSV string.
 * Uses the keys of the first object as headers.
 * Defensive: handles empty arrays and single objects.
 * @param {Array<Object>} json - The JSON array.
 * @returns {string} CSV string.
 */
function jsonToCsv(json) {
  // Defensive: Ensure input is an array
  if (!Array.isArray(json)) json = [json];
  if (!json.length) return '';
  // Extract headers from first object
  const headers = Object.keys(json[0]);
  const csv = [headers.join(',')];
  // Map each object to a CSV row
  json.forEach(obj => {
    csv.push(headers.map(h => (obj[h] !== undefined ? String(obj[h]).replace(/"/g, '""') : '')).join(','));
  });
  return csv.join('\n');
}

/**
 * Converts an XML string to a JSON object.
 * Uses DOMParser and recursively builds a JS object.
 * Defensive: handles attributes, text nodes, and arrays.
 * @param {string} xmlStr - The XML input string.
 * @returns {Object} JSON object representing the XML structure.
 */
function xmlToJson(xmlStr) {
  // Parse XML string into a DOM object
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlStr, 'application/xml');
  
  // Recursively convert DOM to JS object
  function xmlNodeToObj(node) {
    // If the node is a text node, return its trimmed value
    if (node.nodeType === 3) return node.nodeValue.trim();
    
    const obj = {};
    
    // Process attributes of the node
    if (node.attributes && node.attributes.length) {
      for (let attr of node.attributes) {
        obj[`@${attr.name}`] = attr.value;
      }
    }
    
    // Process child nodes
    for (let child of node.childNodes) {
      if (child.nodeType === 3) {
        // If the child is a text node, add its value to the object
        const val = child.nodeValue.trim();
        if (val) obj['#text'] = val;
      } else if (child.nodeType === 1) {
        // If the child is an element node, recursively convert it
        const key = child.nodeName;
        const val = xmlNodeToObj(child);
        if (obj[key]) {
          // If the key already exists, convert it to an array
          if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
          obj[key].push(val);
        } else {
          obj[key] = val;
        }
      }
    }
    return obj;
  }
  
  return xmlNodeToObj(xml.documentElement);
}

/**
 * Converts a JSON object to an XML string.
 * Recursively builds XML tags from object keys and values.
 * Defensive: handles attributes, arrays, and nested objects.
 * @param {Object} obj - The JSON object.
 * @param {string} [nodeName] - Optional root node name.
 * @returns {string} XML string.
 */
function jsonToXml(obj, nodeName) {
  let xml = '';
  // Handle arrays, objects, and primitive values recursively
  if (typeof obj !== 'object' || obj === null) {
    xml += obj;
  } else if (Array.isArray(obj)) {
    obj.forEach(item => {
      xml += jsonToXml(item, nodeName);
    });
  } else {
    Object.keys(obj).forEach(key => {
      if (key.startsWith('@')) return; // Skip attributes at this level
      const value = obj[key];
      // Collect attributes for this node
      const attrs = Object.keys(obj).filter(k => k.startsWith('@')).map(k => ` ${k.substring(1)}="${obj[k]}"`).join('');
      if (Array.isArray(value)) {
        // Handle arrays of child nodes
        value.forEach(item => {
          xml += `<${key}${attrs}>${jsonToXml(item)}</${key}>`;
        });
      } else if (typeof value === 'object' && value !== null) {
        // Handle nested objects
        xml += `<${key}${attrs}>${jsonToXml(value)}</${key}>`;
      } else {
        // Handle primitive values
        xml += `<${key}${attrs}>${value}</${key}>`;
      }
    });
  }
  // Wrap with nodeName if provided
  return nodeName ? `<${nodeName}>${xml}</${nodeName}>` : xml;
}
