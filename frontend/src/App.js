import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [hue1, setHue1] = useState(255);
  const [hue2, setHue2] = useState(222);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--hue1', hue1);
    document.documentElement.style.setProperty('--hue2', hue2);
  }, [hue1, hue2]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsResponse, statsResponse] = await Promise.all([
          fetch('http://localhost:5000/api/projects'),
          fetch('http://localhost:5000/api/stats')
        ]);

        if (!projectsResponse.ok) throw new Error('Failed to fetch projects');
        if (!statsResponse.ok) throw new Error('Failed to fetch stats');

        const projectsData = await projectsResponse.json();
        const statsData = await statsResponse.json();

        setProjects(projectsData);
        setStats(statsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load projects. Please check if the backend is running.');
        // Fallback to static data if API is not available
        setProjects([
          { id: 'eaib', name: '🤖 EAIB', description: 'AI Assistant & Automation', status: 'ready' },
          { id: 'motivabot', name: '💪 MotivaBot', description: 'Motivation & Productivity', status: 'ready' },
          { id: 'broadcast', name: '📡 Broadcast Hub', description: 'Communication Platform', status: 'ready' },
          { id: 'analytics', name: '📊 Analytics', description: 'Data & Insights', status: 'ready' },
          { id: 'tools', name: '🛠️ Dev Tools', description: 'Development Utilities', status: 'ready' },
          { id: 'docs', name: '📚 Documentation', description: 'Project Guides', status: 'ready' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setIsContextMenuOpen(true);
    setTimeout(() => setIsContextMenuOpen(false), 3000);
  };

  const handleProjectClick = (project) => {
    console.log(`Launching ${project.name}`);
    // Here you would typically navigate to the project or open it
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <h2>Loading HaloAI Studios Hub...</h2>
            <p>Connecting to backend services</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" onContextMenu={handleContextMenu}>
      <div className="container">
        <header className="header">
          <h1>HaloAI Studios Hub</h1>
          <p>Central dashboard for AI, automation & development projects</p>
          {stats && (
            <div className="stats">
              <span>📊 {stats.totalProjects} Projects</span>
              <span>✅ {stats.activeProjects} Active</span>
              <span>🏷️ {stats.categories.length} Categories</span>
            </div>
          )}
        </header>

        {error && (
          <div className="error-message">
            <h3>⚠️ Connection Warning</h3>
            <p>{error}</p>
            <small>Running in offline mode with static data</small>
          </div>
        )}

        <div className="instructions">
          <h3>🎯 Quick Start</h3>
          <p>Click any project card to launch. Right-click anywhere for the context menu.</p>
        </div>

        <div className="project-nav">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card" 
              onClick={() => handleProjectClick(project)}
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className={`project-status ${project.status}`}>
                {project.status === 'ready' ? 'Ready' : project.status}
              </div>
            </div>
          ))}
        </div>

        <div className="controls">
          <h3>🎨 Customize Theme</h3>
          <div className="color-control">
            <label>Primary Hue:</label>
            <input
              type="range"
              min="0"
              max="360"
              value={hue1}
              onChange={(e) => setHue1(parseInt(e.target.value))}
            />
            <span>{hue1}°</span>
          </div>
          <div className="color-control">
            <label>Secondary Hue:</label>
            <input
              type="range"
              min="0"
              max="360"
              value={hue2}
              onChange={(e) => setHue2(parseInt(e.target.value))}
            />
            <span>{hue2}°</span>
          </div>
        </div>

        <div className="footer">
          <p>Built with React & modern web technologies</p>
          <div className="tech-stack">
            <span>⚛️ React</span>
            <span>🎨 CSS3</span>
            <span>🚀 Modern JS</span>
            <span>🔗 API</span>
          </div>
        </div>
      </div>

      {/* Context Menu */}
      <div id="contextMenu" className={isContextMenuOpen ? 'open' : ''}>
        <div className="context-header">
          <h3>🎮 Quick Actions</h3>
        </div>
        <div className="context-content">
          <div className="context-item">📁 Open Project</div>
          <div className="context-item">⚙️ Settings</div>
          <div className="context-item">📊 Analytics</div>
          <div className="context-item">🔧 Developer Tools</div>
        </div>
        <div className="context-footer">
          <small>Press ESC to close</small>
        </div>
      </div>
    </div>
  );
}

export default App;
