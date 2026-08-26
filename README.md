## Hi there 👋

<!--
**boutique-frontend/boutique-frontend** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
boutique-frontend/
│
├── index.html            <-- MUST BE HERE (Root level)
│
├── assets/
│   ├── images/           <-- Local placeholder images
│   ├── icons/            <-- SVG UI icons
│   └── logos/            <-- Store brand logo
│
├── css/
│   ├── main.css          <-- Global resets, typography, bottom navbar
│   ├── home.css          <-- Grid, feed, product card styles
│   ├── post.css          <-- Form modal styling
│   ├── contact.css       <-- Contact modal styling
│   └── components.css    <-- Reusable UI elements (buttons, badges)
│
├── js/
│   ├── app.js            <-- App initialization & global event listeners
│   ├── config.js         <-- API URLs & passcode constants
│   ├── api.js            <-- Fetch calls for backend communication
│   │
│   ├── pages/
│   │   ├── home.js       <-- View controller for catalog feed
│   │   ├── post.js       <-- View controller for create post
│   │   └── contact.js    <-- View controller for contact view
│   │
│   ├── components/
│   │   ├── navbar.js     <-- Fixed bottom navbar logic
│   │   └── postCard.js   <-- Dynamic HTML generator for product cards
│   │
│   └── utils/
│       ├── storage.js    <-- Local storage helper
│       └── helpers.js    <-- WhatsApp link generator & formatters
│
└── README.md
