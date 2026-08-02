# Project Context: English Class System (ECS)

Welcome to the **English Class System (ECS)**. This document provides a high-level overview of the project's purpose, features, technologies, and database setup.

## Project Overview
The English Class System is a comprehensive, offline-first web application designed for private language teachers and small school administrators. It simplifies student management, lesson planning, scheduling, attendance tracking, monthly financial tracking, expense logging, tax statements, and annual statistics.

## Core Features
1. **Dashboard (Painel)**: Highlights today's classes, birthday notifications, upcoming holidays, global stats, and recent lessons.
2. **Student Management (Alunos)**: CRUD interface for students with details like name, contact info, birthday, status (active, paused, cancelled), language/subject, level, start date, and class price. Contains direct WhatsApp link helpers.
3. **Weekly Schedule (Agenda)**: Interactive calendar grid where classes are scheduled. Supports weekly recurring schedules and specific single-week overrides. Includes holiday detection and visual blocks.
4. **Attendance Roll-Call (Frequência)**: Daily checklist to log student attendance (Present, Absent, Cancelled). Allows attaching lesson plan topics to classes.
5. **Lesson Plan Library (Plano de Aula)**: A categorized collection of lesson topics (Basic, Intermediate, Advanced, etc.). Drag-and-drop support is included to organize topics.
6. **Vocabulary Library (Expressões)**: Everyday expressions and phrasal verbs helper database.
7. **Tuition and Payments (Financeiro)**: Monthly view showing the calculated tuition fee per student based on their logged attendance and class rates. Supports manual value adjustments and tracking payment status (Paid or Pending).
8. **Monthly Expenses Tracker (Despesas)**: Tracks material, service, and other expenses. Supports recurring monthly billing or one-time expenses.
9. **Tax and Monthly Statements (Declarações)**: Automatic aggregation of monthly values received with manual adjustments support.
10. **Annual Statistics (Estatísticas)**: Visual bar charts depicting monthly earnings and monthly hours taught.
11. **Settings (Configurações)**: Customization of teacher/school branding (name, logo, contact, meeting link) and document uploads.

## Technology Stack
- **Structure**: Semantic HTML5.
- **Styling**: Vanilla CSS utilizing CSS Custom Variables for dynamic styling. Swapping themes (Light/Dark) and Color Modes (Nature, Ocean/Allure, Sun, Flower) dynamically updates CSS tokens.
- **Logic**: Vanilla ES6+ JavaScript. No build tools or compilers are required.
- **Backend/Database**:
  - **Supabase**: If configured, the app integrates with Supabase for user authentication (signup, signin, password recovery) and Postgres storage via an `app_data` key-value table.
  - **Fallback LocalStorage**: If Supabase credentials are not supplied, the app defaults to a custom offline storage layer using `window.storage` / LocalStorage, securing access with a SHA-256 hashed password.
- **Bundled Assets**: Assets like the standard class rules PDF (`CONTRACT_PDF_DATAURL`) and background images (`LOGIN_IMG_DATAURL`) are encoded as Base64 strings directly in the source code to support zero-install, single-file distribution.
