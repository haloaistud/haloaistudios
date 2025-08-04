# 🌐 HaloAI Studios Hub

Official monorepo for **HaloAI Studios**' AI, assistant, and automation projects.

## 🚀 Features

- **Beautiful UI**: Modern neon glass design with customizable themes
- **Real-time API**: Express.js backend with RESTful endpoints
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Elements**: Context menu, hover effects, and smooth animations
- **Project Management**: Central dashboard for all HaloAI projects
- **Theme Customization**: Dynamic color controls with live preview

## 📦 Project Structure

```
haloaistudios/
├── frontend/           # React application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
├── backend/           # Express.js API server
│   ├── server.js      # Main server file
│   ├── server.test.js # Backend tests
│   └── package.json   # Backend dependencies
├── haloai-projects/   # Individual project modules
│   └── eaib/         # EAIB project
└── README.md         # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **CSS3** - Advanced styling with custom properties
- **Google Fonts** - Asap font family
- **Testing Library** - Comprehensive test suite

### Backend
- **Express.js** - RESTful API server
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Jest** - Testing framework

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/haloaistud/haloaistudios.git
   cd haloaistudios
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on http://localhost:5000

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on http://localhost:3000

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

### Run All Tests
```bash
# From project root
cd frontend && npm test -- --watchAll=false
cd ../backend && npm test
```

## 🏗️ Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```
The build will be created in `frontend/build/`

### Backend Build
```bash
cd backend
npm start
```

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API information |
| `/api/health` | GET | Health check |
| `/api/projects` | GET | List all projects |
| `/api/projects/:id` | GET | Get specific project |
| `/api/stats` | GET | Project statistics |

### Example API Response
```json
{
  "id": "eaib",
  "name": "🤖 EAIB",
  "description": "AI Assistant & Automation",
  "status": "ready",
  "url": "/eaib",
  "category": "ai"
}
```

## 🎨 Customization

### Theme Colors
The application features dynamic theme customization:
- **Primary Hue**: Controls main accent colors
- **Secondary Hue**: Controls secondary accent colors
- **Live Preview**: Changes apply immediately

### Adding New Projects
1. Add project data to `backend/server.js`
2. Update the projects array with new project information
3. The frontend will automatically display new projects

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy build/ folder
```

### Backend (Heroku/Railway)
```bash
cd backend
# Set environment variables
npm start
```

### Docker Deployment
```dockerfile
# Frontend
FROM node:18-alpine
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# Backend
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔧 Development

### Code Style
- **Frontend**: ESLint with React rules
- **Backend**: Standard JavaScript
- **Testing**: Jest with Testing Library

### File Structure
```
src/
├── App.js          # Main application component
├── App.css         # Styles with CSS custom properties
├── App.test.js     # Comprehensive test suite
└── index.js        # Application entry point
```

## 📱 Features

### Interactive Elements
- **Project Cards**: Click to launch projects
- **Context Menu**: Right-click for quick actions
- **Theme Controls**: Real-time color customization
- **Loading States**: Smooth loading animations
- **Error Handling**: Graceful fallback to offline mode

### Responsive Design
- **Desktop**: Full feature set with grid layout
- **Tablet**: Optimized touch interactions
- **Mobile**: Single column layout with touch-friendly controls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/haloaistud/haloaistudios/issues)
- **Discussions**: [GitHub Discussions](https://github.com/haloaistud/haloaistudios/discussions)
- **Email**: contact@haloaistudios.com

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Express.js Team** - For the robust backend framework
- **Google Fonts** - For the beautiful typography
- **CSS Working Group** - For modern CSS features

---

**Built with ❤️ by HaloAI Studios**

> GitHub: [haloaistud](https://github.com/haloaistud)
