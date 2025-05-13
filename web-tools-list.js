// data.js

// Example categories
const web_tools_categories = [
  "Conversion",
  "Design",
  "Others"
];

// Example tools
const web_tools_list = [
  {
    name: "File Extension Converter",
    link: "./tools/conversion/file_ext_convert/index.html",
    image: "./tools/conversion/file_ext_convert/img/logo.png",
    alt: "File Extension Converter Logo",
    category: "Conversion"
  },
  {
    name: "Simple Paint",
    link: "./tools/design/simple_paint/index.html",
    image: "./tools/design/simple_paint/img/logo.png",
    alt: "Simple Paint Logo",
    category: "Design"
  },
  {
    name: "FSWD Crash Course",
    link: "./tools/others/fswd_crash_course/index.html",
    image: "./tools/others/fswd_crash_course/img/logo.png",
    alt: "FSWD Crash Course Logo",
    category: "Others"
  }
  // Add more tool objects as needed
];

// Set to localStorage if not already present
if (!localStorage.getItem('web_tools_list')) {
  localStorage.setItem('web_tools_list', JSON.stringify(web_tools_list));
}
if (!localStorage.getItem('web_tools_categories')) {
  localStorage.setItem('web_tools_categories', JSON.stringify(web_tools_categories));
}
