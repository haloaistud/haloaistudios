const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Sample data
const projects = [
  {
    id: 'eaib',
    name: '🤖 EAIB',
    description: 'AI Assistant & Automation',
    status: 'ready',
    url: '/eaib',
    category: 'ai'
  },
  {
    id: 'motivabot',
    name: '💪 MotivaBot',
    description: 'Motivation & Productivity',
    status: 'ready',
    url: '/motivabot',
    category: 'productivity'
  },
  {
    id: 'broadcast',
    name: '📡 Broadcast Hub',
    description: 'Communication Platform',
    status: 'ready',
    url: '/broadcast',
    category: 'communication'
  },
  {
    id: 'analytics',
    name: '📊 Analytics',
    description: 'Data & Insights',
    status: 'ready',
    url: '/analytics',
    category: 'data'
  },
  {
    id: 'tools',
    name: '🛠️ Dev Tools',
    description: 'Development Utilities',
    status: 'ready',
    url: '/tools',
    category: 'development'
  },
  {
    id: 'docs',
    name: '📚 Documentation',
    description: 'Project Guides',
    status: 'ready',
    url: '/docs',
    category: 'documentation'
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'HaloAI Studios Hub API',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/stats', (req, res) => {
  res.json({
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'ready').length,
    categories: [...new Set(projects.map(p => p.category))]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 HaloAI Studios Hub API running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📋 Projects: http://localhost:${PORT}/api/projects`);
  });
}

module.exports = app;