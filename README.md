# 🚀 **Minimal Web Tools Collection**

<!-- Badges / Tags -->
<p align="left">
  <img src="https://img.shields.io/badge/Responsive-Yes-44cc11" alt="Responsive" />
  <img src="https://img.shields.io/badge/LocalStorage-Persistent-ff9800" alt="LocalStorage" />
  <img src="https://img.shields.io/badge/License-Free-29b6f6" alt="Free License" />
</p>

Welcome to **Minimal Web Tools Collection** – *A customizable hub for essential web utilities!*  
Easily access, organize, and extend a suite of tools, all at ease for both online and offline use.  
Perfect for quick and simple access ✨

---

## 📁 **Project Structure**

```text
Web Tools App/
├── index.html
├── management-dashboard/
│   ├── management.html
│   └── web-tools-list.js
├── tools/
│   ├── conversion/
│   │   └── file_ext_convert/
│   │       ├── index.html
│   │       ├── script.js
│   │       ├── styles.css
│   │       ├── ... (other files/folders)
│   │       └── img/
│   │           └── logo.png
│   ├── design/
│   │   └── simple_paint/
│   │       ├── index.html
│   │       ├── script.js
│   │       ├── styles.css
│   │       ├── ... (other files/folders)
│   │       └── img/
│   │           └── logo.png
│   └── others/
│       └── fswd_crash_course/
│           ├── index.html
│           ├── script.js
│           ├── styles.css
│           ├── ... (other files/folders)
│           └── img/
│               └── logo.png
├── README.md
└── ... (other files/folders)
```

- **`index.html`**: *Main landing page for browsing tools.*
- **`management-dashboard/`**: *Contains the management dashboard and the default tools/categories data.*
- **`tools/`**: *Place your tool folders here (each tool in its own subfolder).*
- **`README.md`**: *This documentation file.*

---

## 🌟 **Features**

- 🗂️ **Categorized Tools:** *Conversion, Design, and more – grouped for easy browsing.*
- ⚡ **Dynamic & Customizable:** *Add, edit, or remove tools and categories via the Management Dashboard.*
- 📱 **Responsive Design:** *Looks great on desktop and mobile, with smooth navigation.*
- 💾 **Persistent Storage:** *Tools and categories are saved in your browser (localStorage).*
- 🧩 **Easy Extension:** *Import your own local tools for permanent use.*
- 🎨 **Simple UI:** *Built with Tailwind CSS and FontAwesome for a clean, accessible experience.*

---

## 🚦 **Getting Started**

1. **Download the published version** (3 ways) 
   - <u>Method 1 - Clone the repository</u>
     ```sh
     git clone https://github.com/ndmh99/web-tools-app.git
     ```
   - <u>Method 2 - Download the ZIP file</u>         
      Go to the [Releases](https://github.com/ndmh99/web-tools-app/releases) page and download the latest published ZIP file and extract it.      

   - <u>Method 3 - Use the automated BAT file (for Windows) or COMMAND file (for MacOS)</u>         
      Download the provided `.bat` or `.command` file from the release page. Click to run it and follow the prompts to automatically download and extract the latest version from terminal.
2. Open `index.html` in your favorite web browser.
3. Browse tools by category, or open the **Management Dashboard** (`management-dashboard/management.html`) to customize your collection.
4. Click any tool to launch it in a new tab!

---

## 🛠️ **How to Import a Local Tool**

Want to add your own tool (e.g., a local HTML/JS app) to the collection?  
Follow these steps to make it a *permanent* part of your toolbox:

1. **Place your tool folder** inside the `tools` directory (e.g., `tools/mytool/index.html`).
2. **Add your tool to the list:**
   - Open `management-dashboard/web-tools-list.js`.
   - Add a new object to the `web_tools_list` array:
     ```js
     {
         name: "My Local Tool",
         link: "tools/mytool/filename.extension", // relative path to your tool
         image: "tools/mytool/logo.png", // or a placeholder image
         alt: "My Local Tool Logo",
         category: "YourCategory" // Use an existing or new category
     }
     ```
   - Add your category to `web_tools_categories` if it's a new category.
      ```js
      {
         const web_tools_categories = [
         "Conversion",
         "Design",
         "Others"
         ];
      }
      ```
3. **Apply new defaults (if you edited the defaults file):**  
   Open the Management Dashboard and click **"Reset to Defaults"** (you must type `AGREE`). This overwrites current local tools & categories with the contents of `web-tools-list.js`.

---

### ➕ **How to Add Tools via the Management Dashboard**

You can also add, edit, or remove tools and categories directly from the **Management Dashboard** (`management-dashboard/management.html`):

1. **Open** `management-dashboard/management.html` in your browser or click the **"Open Management Dashboard"** button in the main app.
2. **To add a new tool:**
   - Click the **"Add Tool"** button.
   - Fill in the tool's name, link (URL or relative path), image (URL or relative path), alt text, and select or enter a category.
   - Click **"Save"** to add the tool.
3. **To add a new category:**
   - Click the **"Add Category"** button.
   - Enter the category name and save.
4. **To edit or remove tools/categories:**  
   Use the edit (✏️) or delete (🗑️) icons next to each item.
5. **To make a tool permanent for all users:**  
   - Add it to `management-dashboard/web-tools-list.js` (ensure its folder exists under `tools/`).  
   - Then either clear localStorage or use **Reset to Defaults** to reload the updated defaults.

---

## ⚠️ **Important: LocalStorage Persistence Warning**

> **Heads up!**  
> Tools and categories you add via the dashboard are stored in your browser's localStorage.  
> **If you clear your browser data, switch browsers, or use incognito mode, your custom tools may be lost!**

**To make a tool permanent:**  
- Always add it to the `web_tools_list` array in `management-dashboard/web-tools-list.js` (see above).
- This ensures your tool is always loaded, even after clearing localStorage.

---

## 📋 **Usage**

- **Browse:** Explore tools by category on the main page `index.html`.
- **Manage:** Open `management-dashboard/management.html` to add, edit, or remove tools and categories.
- **Permanent Save:** To ensure tools are not lost after clearing browser data, manually add them to `management-dashboard/web-tools-list.js` as described in the **How to Import a Local Tool** section.
- **Reset to Defaults:** Use **"Reset to Defaults"** (type `AGREE`) to discard current customizations and restore only the defaults from `web-tools-list.js`.
   (Back up localStorage first if you want to preserve custom tools.)

---

## 🗒️ **Version Release**
__Latest Official Release:__ [<u>_v0.0.1-published_</u>](https://github.com/ndmh99/Web-Tools-App/releases/tag/v0.0.1-published)
> To see all published versions, visit: [Releases Page](https://github.com/ndmh99/web-tools-app/releases)
---

## 🧑‍💻 **Technologies Used**

- **HTML5**
- **CSS3** (*Tailwind CSS*)
- **JavaScript (ES6+)**
- **FontAwesome Icons**

---

## 👨‍🎨 **Author**

Made with ❤️ by **NDMH**

---

## 🔗 **Important Links**

- [🌐 Project Homepage](https://github.com/ndmh99/web-tools-app)
- [⬇️ Latest Release & All Versions](https://github.com/ndmh99/web-tools-app/releases)
- [📖 Wiki & Documentation](https://github.com/ndmh99/web-tools-app/wiki)
- [🐞 Issues & Bug Reports](https://github.com/ndmh99/web-tools-app/issues)
- [🚀 Author Profile](https://github.com/ndmh99)

---

## 🆓 **License**

> This project is **free to use**.  
> *No rights reserved.*

---

<!-- Badges / Tags (footer) -->
<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript ES6+" />
  <img src="https://img.shields.io/badge/FontAwesome-528DD7?logo=fontawesome&logoColor=white" alt="FontAwesome" />
  <img src="https://img.shields.io/badge/Responsive-Yes-44cc11" alt="Responsive" />
  <img src="https://img.shields.io/badge/LocalStorage-Persistent-ff9800" alt="LocalStorage" />
  <img src="https://img.shields.io/badge/License-Free-29b6f6" alt="Free License" />
</p>