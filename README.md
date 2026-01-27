# One-Link Demo - Green Pakistan / FOS Digital Platform

[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

> **Interactive Walkthrough & Simulation of the FOS Grievance Management Ecosystem.**

## 📖 Project Overview

The **One-Link Demo** is a specialized, standalone interactive application designed to showcase the full capabilities of the **Fruit of Sustainability (FOS) / Green Pakistan Platform**. 

Unlike the production platform (which consists of separate specific microservices and dashboards), this application serves as a **cinematic narrative tool**. It uses audio voice-overs synchronized with advanced frontend animations to simulate user journeys, making it ideal for:
*   **Client Demonstrations**: Presenting the full feature set without requiring live data or backend connectivity.
*   **Stakeholder Training**: Explaining the end-to-end workflow of grievance handling and compliance.
*   **Exhibitions**: A self-driving or interactive "Kiosk Mode" experience.

## ✨ Key Features

This project utilizes a high-end "gaming-style" architecture to deliver smooth visual storytelling:
*   **Audio-Driven Navigation**: Scenes serve as a visual accompaniment to a narrated script, synchronized via time-coded events.
*   **Cinematic UI**: Features ambient particle systems, light rays, and glassmorphism effects for a premium "WOW" factor.
*   **Interactive Simulation**: Users can interact with simulated phone screens, dashboards, and forms that mimic the real application's behavior.
*   **Module-Based Structure**: Organized into 4 distinct content modules covering the platform's core value propositions.

---

## 🏗 Modular Breakdown

The application guides users through 4 key operational stages of the FOS ecosystem:

### 1. 🚀 Deployment & Onboarding (Module 1)
*   **Narrative**: How factories join the platform.
*   **Visuals**: Bulk employee data upload simulation, data validation checks, and generating digital ID cards.
*   **Key Scenes**: `Hero` -> `Upload` -> `SMS` -> `ID Card Generation` -> `Training`.

### 2. 🛡 Complaint Intake (Module 2)
*   **Narrative**: The multi-channel grievance reporting ecosystem.
*   **Visuals**: Simulation of reporting via **Toll-Free Hotline, SMS, WhatsApp, and Mobile App**.
*   **Key Scenes**: Anonymous reporting flows, ticket number generation, and instant IO (Investigation Officer) notification.

### 3. 🔍 Investigation & Resolution (Module 3)
*   **Narrative**: The structured workflow for resolving complaints.
*   **Visuals**: IO Dashboard simulation.
*   **Process**:
    1.  **Review**: Unprocessed -> In Process.
    2.  **RCA**: Root Cause Analysis & Evidence collection.
    3.  **CAPA**: Corrective & Preventive Action Plans with deadline tracking.

### 4. 📊 Risk Insights & Surveys (Module 4)
*   **Narrative**: Proactive employee engagement and analytics.
*   **Visuals**: Creating and launching digital surveys.
*   **Features**: Demographic targeting (Gender, Department), random sampling, and AI-driven sentiment analysis dashboards.

---

## 🛠 Technology Stack

This is a **Frontend-Only** application that simulates backend interactions.

*   **Core Framework**: React 19 + TypeScript
*   **State & Animation**: `framer-motion` (Complex sequencing), `react-spring` (Physics-based interactions).
*   **Styling**: `tailwind-css`, `styled-components`, `lucide-react` (Icons).
*   **Audio Engine**: `howler.js` for precise audio sprite control and seamless looping.
*   **Visualization**: `recharts` for simulated analytics graphs, `leaflet` for map visualizations.

---

## 🚀 Local Development Setup

Since this is a standalone demo, it does not require a backend connection.

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/minhalawais/ISP-MANAGEMENT-SYSTEM.git
    cd ISP-MANAGEMENT-SYSTEM
    # Note: Folder might be named One-Link-Demo based on your unzip location
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # OR if you face dependency conflicts (due to React 19 beta/RC usage)
    npm install --legacy-peer-deps
    ```

3.  **Run Development Server**
    ```bash
    npm start
    ```
    The app will launch at `http://localhost:3000`.

4.  **Build for Production**
    ```bash
    npm run build
    ```
    Outputs static files to the `build` directory, ready for deployment on Netlify, Vercel, or any static host.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── scenes/          # Individual story scenes (e.g., scene-upload.tsx)
│   ├── ui/              # Reusable UI elements (Buttons, Cards)
│   ├── Slide.tsx        # Main slide wrapper component
│   └── NavigationPill.tsx # The floating control bar
├── lib/
│   └── module-data.ts   # Configuration for scenes and timings
├── pages/
│   ├── module1-player.tsx # Orchestrator for Module 1
│   └── ...
├── App.tsx              # Main entry point & Audio Context
└── index.css            # Global styles & Tailwind directives
```

## ⚠️ Note on "Backend"
This repository interacts with **mock data** and scripts. It **does not** connect to the production FOS database. All "uploads" and "reports" are simulated for demonstration purposes.

---

<div align="center">
  <p>Developed for <strong>Fruit of Sustainability (SMC-Private) Ltd.</strong></p>
  <p><em>Delivering Technology for Human Rights Due Diligence.</em></p>
</div>
