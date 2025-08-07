const request = require('supertest');
const express = require('express');

// Import the app (we'll need to modify server.js to export the app)
const app = require('./server');

describe('HaloAI Studios Hub API', () => {
  describe('GET /', () => {
    it('should return API info', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('status');
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /api/projects', () => {
    it('should return all projects', async () => {
      const response = await request(app).get('/api/projects');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(6);
      
      const project = response.body[0];
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('name');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('status');
    });
  });

  describe('GET /api/projects/:id', () => {
    it('should return specific project', async () => {
      const response = await request(app).get('/api/projects/eaib');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 'eaib');
      expect(response.body).toHaveProperty('name', '🤖 EAIB');
    });

    it('should return 404 for non-existent project', async () => {
      const response = await request(app).get('/api/projects/nonexistent');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/stats', () => {
    it('should return statistics', async () => {
      const response = await request(app).get('/api/stats');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('totalProjects');
      expect(response.body).toHaveProperty('activeProjects');
      expect(response.body).toHaveProperty('categories');
      expect(response.body.totalProjects).toBe(6);
      expect(response.body.activeProjects).toBe(6);
    });
  });

  describe('404 handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/api/unknown');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});