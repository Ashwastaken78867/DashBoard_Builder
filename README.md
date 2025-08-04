# 🧩 React Dashboard Builder

A modern, drag-and-drop dashboard builder built with **React**, **Redux Toolkit**, **Tailwind CSS**, and **react-grid-layout**. Users can dynamically add, configure, move, and export widgets like tables and charts in a responsive dashboard layout.

---

## ✨ Features

- ⚙️ **Drag-and-Drop Layout** — Powered by `react-grid-layout` for seamless resizing and positioning
- 📦 **Dynamic Widgets** — Add charts and tables via Redux state management
- 🎨 **Widget Settings Panel** — Configure chart data, labels, values, and colors dynamically
- 🌓 **Dark/Light Theme Toggle** — Persisted via `next-themes`
- 🖼️ **Export as PNG** — Download the dashboard layout as a high-resolution PNG using `dom-to-image-more`
- 🔍 **Search Bar** — Quickly filter or focus on specific widgets (future enhancement-ready)
- 💅 **Responsive & Styled UI** — Built using Tailwind CSS and ShadCN UI components

---

## 🛠️ Tech Stack

| Category       | Technologies                                  |
|----------------|-----------------------------------------------|
| **Frontend**   | React, TypeScript, Vite                       |
| **State Mgmt** | Redux Toolkit                                 |
| **UI**         | Tailwind CSS, ShadCN UI, Lucide Icons         |
| **Layout**     | react-grid-layout, react-resizable            |
| **Export**     | dom-to-image-more                             |
| **Themes**     | next-themes                                   |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/dashboard-builder.git
cd dashboard-builder
```
## 2. Install dependencies
```bash 

npm install
```
## 3. Start the development server

```bash
npm run dev
```

## 📦 Folder Structure

src/
├── components/
│   ├── layout/          → Header, Sidebar, Canvas
│   ├── widgets/         → ChartWidget, TableWidget
├── redux/               → widgetsSlice.ts, store.ts
├── types/               → dom-to-image-more.d.ts (custom typings)
├── App.tsx
├── main.tsx

## ❓ FAQ

# Can I save dashboards?

Currently, dashboard layout is held in Redux only (in-memory). You can extend this to use localStorage or backend APIs.

# Is authentication required?

No — this is a frontend-only demo. No login/signup or user-based storage is implemented.

# Can I export to PDF or SVG?

PNG export is supported via dom-to-image-more. You can add PDF support using jspdf if needed.

## ✅ Future Improvements
💾 Save/Load dashboards from localStorage

🔄 Import/export as JSON templates

👥 User authentication (e.g., with Auth0 or Firebase)

🧩 New widget types (Calendar, Map, KPIs)

📤 Export as PDF or SVG

🌐 Backend integration for persistent storage

## 🙋‍♂️ Author
Ash Bagda
Frontend Developer • React Enthusiast
