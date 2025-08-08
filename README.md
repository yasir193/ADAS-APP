# Advanced Driver Assistance Systems Application

> A React + Vite powered single‑page application as the frontend for ADAS APP, deployed at [https://graduation-project-rouge-eight.vercel.app](https://graduation-project-rouge-eight.vercel.app)

## 🧠 About

This is the frontend of an Advanced Driver Assistance System (ADAS) web application, built to support real-time vehicle monitoring and driver safety. Designed with a strong focus on user experience, responsiveness, and real-time data rendering, the app provides a seamless interface to visualize drowsiness alerts, GPS location, live camera feeds, and traffic speed.

Developed using React.js, Tailwind CSS, and Axios, the interface integrates with backend APIs and AI models to provide dynamic and intuitive interaction. It includes responsive layouts, real-time visual/audio alerts, embedded Google Maps tracking, and mobile camera integration using DroidCam — all optimized for both desktop and mobile views. The frontend is fully deployed on Vercel for fast, scalable access.


## Key Features

- **Real-Time Drowsiness Alerts:**
Visual and audio alerts are triggered based on AI model outputs, seamlessly integrated with the frontend UI.

- **Live GPS Tracking:**
Embedded Google Maps API displays real-time vehicle location, updated continuously via backend integration.

- **Mobile Camera Streaming:**
Supports live video feed from a mobile device using DroidCam, displayed directly in the web interface.

- **Traffic Speed Monitoring:**
Displays current traffic speed values fetched from the backend, updated every 10 seconds.

- **JWT Authentication:**
Secured access to frontend routes and protected data, with token-based login and logout handling.

- **Responsive UI:**
Built with Tailwind CSS, the app is fully responsive and optimized for both mobile and desktop screens.




## 📦 Technologies

- **React** (via Vite)
- **Vite** for development & build tooling
- **ESLint** with custom configuration
- **JavaScript**, **HTML**, **CSS**

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm (or Yarn)
- use this 30001010124353 in the login page to get access to the app

### Install dependencies and run development server

```bash
git clone https://github.com/yasir193/graduation-project.git
cd graduation-project
npm install
npm run dev
```

Visit `http://localhost:5173` to preview the app with hot‑reload.

### Build for production

```bash
npm run build
```

Deploy the contents of the generated `dist/` folder to a static hosting service (e.g., Vercel, Netlify).

## 🔧 Configuration

Configuration files include:

- `vite.config.js` — Vite build setup
- `eslint.config.js` — linting rules
- `package.json` — scripts and dependencies

Customize or extend as needed (e.g. add plugins, CSS preprocessors, TypeScript).

## 🧩 Project Structure

```
.
├── public/          
├── src/             
│   ├── assests/
│   ├── components/
│   ├── imgs/
│   ├── App.css/
│   ├── App.jsx/
│   ├── index.css/
│   └── main.jsx
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🚀 Deployment

This repository is set up to deploy through **Vercel**. Any push to the `main` or `master` branch will automatically trigger a build and publish to [https://graduation-project-rouge-eight.vercel.app](https://graduation-project-rouge-eight.vercel.app).


## 🧪 Testing

_No tests currently defined._  
Consider adding unit/integration tests (e.g. using Jest, React Testing Library) for core components and page flows.

## 🙏 Contributing

Contributions are welcome!

1. Fork the repository  
2. Create a feature branch (`feature/my-feature`)  
3. Commit your changes  
4. Push branch and open a Pull Request  
5. After review, your changes may be merged  


## 📞 Contact

**Yasir Ahmad Sayyed** – Frontend Developer – [GitHub Profile](https://github.com/yasir193)  
Project frontend: [graduation‑project‑rouge-eight.vercel.app](https://graduation-project-rouge-eight.vercel.app)  
Project backend: [http://github.com/yasir193/graduation-project-backend](http://github.com/yasir193/graduation-project-backend)

