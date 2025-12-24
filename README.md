🌆 Hazleton Tour Website

A dynamic, front-end website designed to showcase Hazleton, Pennsylvania, including landmarks, local businesses, events, and community highlights.
All page content is powered by a JSON configuration file, allowing content updates without touching HTML or JavaScript.

📌 Features

Fully responsive design using HTML & CSS

Interactive behavior using vanilla JavaScript

JSON-driven content system

Change text, titles, sections, and page content by editing a single JSON file

Modular page structure for easy expansion

Beginner-friendly and well-organized file structure

🛠️ Technologies Used

HTML5 – Page structure

CSS3 – Styling and layout

JavaScript (ES6) – Dynamic rendering and logic

JSON – Centralized content management

📂 Project Structure
hazleton-tour/
│
├── index.html
├── locations.html
├── events.html
│
├── css/
│   └── styles.css
│
├── js/
│   └── main.js
│
├── data/
│   └── content.json
│
└── README.md

🔁 How the JSON Content System Works

All visible content on the site is loaded from content.json.

JavaScript fetches this file and dynamically injects the data into the HTML.
Updating the JSON automatically updates the website content — no HTML edits required.

Example Flow

Edit content.json

Reload the page

JavaScript re-renders content

Updated text appears instantly

🚀 How to Run the Project
Option 1: Live Server (Recommended)

Use VS Code Live Server

Open index.html

Opening files directly without a local server may prevent JSON from loading correctly.

👤 Author

Tommy Manuel Coronado
Computer Science Student

Project built for learning modern front-end web development and content-driven design.
