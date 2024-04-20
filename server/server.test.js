const express = require("express");
// const app = express();
const {app,closeServer} = require("./server.js");
app.use(express.json());
const cors = require('cors');
app.use(cors());
const request = require('supertest');
const db = require("./db.js");

afterAll(async () => {
    // Close database connection for cleanup
    closeServer();
    await db.close();
});
describe('GET /api/home', () => {
    it('should respond with status 200 and message "Hello World!"', async () => {
      const response = (await request(app).get('/api/home'));
      expect(response.status).toBe(200); // Check if status code is 200
      expect(response.body).toEqual({ message: 'Hello World!' }); // Check if response body matches expected
    });
});
 
 describe('GET /api/quality-reports', () => {
    it('should respond with status 200', async () => {
        const response = (await request(app).get('/api/quality-reports'));
        expect(response.status).toBe(200); // Check if status code is 200
    });
 });
 
 describe('GET /api/schools', () => {
    it('should respond with status 200', async () => {
        const response = await request(app).get('/api/schools');
        expect(response.status).toBe(200); // Check if status code is 200
    });
 });

 describe('GET /api/schools/:dbn', () => {
    it('should respond with status 404', async () => {
        const response = await request(app).get('/api/schools/01M292');
        expect(response.status).toBe(200); // Check if status code is 200
 });
});

 describe('GET /api/schools/:dbn', () => {
    it('should respond with status 404', async () => {
        const response = await request(app).get('/api/schools/error');
        expect(response.status).toBe(404); // Check if status code is 404
 });
});

 describe('GET /api/schools/quality-reports/:dbn', () => {
    it('should respond with status 200', async () => {
        const response = await request(app).get('/api/schools/quality-reports/01M292');
        expect(response.status).toBe(200); // Check if status code is 200
 });
});

 describe('GET /api/schools/quality-reports/:dbn', () => {
    it('should respond with status 200', async () => {
        const response = await request(app).get('/api/schools/quality-reports/error');
        expect(response.status).toBe(404); // Check if status code is 404
 });
});
