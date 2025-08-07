import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock fetch
global.fetch = jest.fn();

describe('HaloAI Studios Hub', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders loading state initially', () => {
    fetch.mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<App />);
    
    expect(screen.getByText(/Loading HaloAI Studios Hub/i)).toBeInTheDocument();
    expect(screen.getByText(/Connecting to backend services/i)).toBeInTheDocument();
  });

  test('renders HaloAI Studios Hub title after loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 'eaib', name: '🤖 EAIB', description: 'AI Assistant & Automation', status: 'ready' }
      ]
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ totalProjects: 1, activeProjects: 1, categories: ['ai'] })
    });

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/HaloAI Studios Hub/i)).toBeInTheDocument();
    });
  });

  test('renders dashboard description after loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 'eaib', name: '🤖 EAIB', description: 'AI Assistant & Automation', status: 'ready' }
      ]
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ totalProjects: 1, activeProjects: 1, categories: ['ai'] })
    });

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/Central dashboard for AI, automation & development projects/i)).toBeInTheDocument();
    });
  });

  test('renders EAIB project card after loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 'eaib', name: '🤖 EAIB', description: 'AI Assistant & Automation', status: 'ready' }
      ]
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ totalProjects: 1, activeProjects: 1, categories: ['ai'] })
    });

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/🤖 EAIB/i)).toBeInTheDocument();
    });
  });

  test('renders all project cards after loading', async () => {
    const mockProjects = [
      { id: 'eaib', name: '🤖 EAIB', description: 'AI Assistant & Automation', status: 'ready' },
      { id: 'motivabot', name: '💪 MotivaBot', description: 'Motivation & Productivity', status: 'ready' },
      { id: 'broadcast', name: '📡 Broadcast Hub', description: 'Communication Platform', status: 'ready' },
      { id: 'analytics', name: '📊 Analytics', description: 'Data & Insights', status: 'ready' },
      { id: 'tools', name: '🛠️ Dev Tools', description: 'Development Utilities', status: 'ready' },
      { id: 'docs', name: '📚 Documentation', description: 'Project Guides', status: 'ready' }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjects
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ totalProjects: 6, activeProjects: 6, categories: ['ai', 'productivity'] })
    });

    render(<App />);
    
    await waitFor(() => {
      // Check that we have exactly 6 project cards
      const projectCards = document.querySelectorAll('.project-card');
      expect(projectCards).toHaveLength(6);
      
      // Verify each project card has the expected structure
      projectCards.forEach(card => {
        expect(card.querySelector('h3')).toBeInTheDocument();
        expect(card.querySelector('p')).toBeInTheDocument();
        expect(card.querySelector('.project-status')).toBeInTheDocument();
      });
    });
  });

  test('renders stats after loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 'eaib', name: '🤖 EAIB', description: 'AI Assistant & Automation', status: 'ready' }]
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ totalProjects: 1, activeProjects: 1, categories: ['ai'] })
    });

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/📊 1 Projects/i)).toBeInTheDocument();
      expect(screen.getByText(/✅ 1 Active/i)).toBeInTheDocument();
      expect(screen.getByText(/🏷️ 1 Categories/i)).toBeInTheDocument();
    });
  });

  test('renders color controls after loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 'eaib', name: '🤖 EAIB', description: 'AI Assistant & Automation', status: 'ready' }]
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ totalProjects: 1, activeProjects: 1, categories: ['ai'] })
    });

    render(<App />);
    
    await waitFor(() => {
      const primaryHueLabel = screen.getByText(/Primary Hue:/i);
      const secondaryHueLabel = screen.getByText(/Secondary Hue:/i);
      expect(primaryHueLabel).toBeInTheDocument();
      expect(secondaryHueLabel).toBeInTheDocument();
    });
  });

  test('renders theme customization section after loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 'eaib', name: '🤖 EAIB', description: 'AI Assistant & Automation', status: 'ready' }]
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ totalProjects: 1, activeProjects: 1, categories: ['ai'] })
    });

    render(<App />);
    
    await waitFor(() => {
      const themeTitle = screen.getByText(/🎨 Customize Theme/i);
      expect(themeTitle).toBeInTheDocument();
    });
  });

  test('renders quick start instructions after loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 'eaib', name: '🤖 EAIB', description: 'AI Assistant & Automation', status: 'ready' }]
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ totalProjects: 1, activeProjects: 1, categories: ['ai'] })
    });

    render(<App />);
    
    await waitFor(() => {
      const quickStartTitle = screen.getByText(/🎯 Quick Start/i);
      const instructions = screen.getByText(/Click any project card to launch/i);
      expect(quickStartTitle).toBeInTheDocument();
      expect(instructions).toBeInTheDocument();
    });
  });

  test('renders tech stack in footer after loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 'eaib', name: '🤖 EAIB', description: 'AI Assistant & Automation', status: 'ready' }]
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ totalProjects: 1, activeProjects: 1, categories: ['ai'] })
    });

    render(<App />);
    
    await waitFor(() => {
      const reactTech = screen.getByText(/⚛️ React/i);
      const cssTech = screen.getByText(/🎨 CSS3/i);
      const jsTech = screen.getByText(/🚀 Modern JS/i);
      const apiTech = screen.getByText(/🔗 API/i);
      expect(reactTech).toBeInTheDocument();
      expect(cssTech).toBeInTheDocument();
      expect(jsTech).toBeInTheDocument();
      expect(apiTech).toBeInTheDocument();
    });
  });

  test('project cards are clickable after loading', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 'eaib', name: '🤖 EAIB', description: 'AI Assistant & Automation', status: 'ready' }]
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ totalProjects: 1, activeProjects: 1, categories: ['ai'] })
    });

    render(<App />);
    
    await waitFor(() => {
      const eaibCard = screen.getByText(/🤖 EAIB/i).closest('.project-card');
      fireEvent.click(eaibCard);
      
      expect(consoleSpy).toHaveBeenCalledWith('Launching 🤖 EAIB');
    });
    
    consoleSpy.mockRestore();
  });

  test('context menu appears on right click after loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 'eaib', name: '🤖 EAIB', description: 'AI Assistant & Automation', status: 'ready' }]
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ totalProjects: 1, activeProjects: 1, categories: ['ai'] })
    });

    render(<App />);
    
    await waitFor(() => {
      const container = screen.getByText(/HaloAI Studios Hub/i).closest('.app-container');
      fireEvent.contextMenu(container);
      
      // Context menu should appear
      const contextMenu = document.getElementById('contextMenu');
      expect(contextMenu).toHaveClass('open');
    });
  });

  test('shows error message when API fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/⚠️ Connection Warning/i)).toBeInTheDocument();
      expect(screen.getByText(/Failed to load projects/i)).toBeInTheDocument();
      expect(screen.getByText(/Running in offline mode/i)).toBeInTheDocument();
    });
  });
});
