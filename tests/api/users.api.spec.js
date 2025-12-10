/**
 * Tutorial 4: API Testing with Playwright
 * 
 * This example demonstrates:
 * - GET, POST, PUT, DELETE requests
 * - Status code validation
 * - Response body validation
 * - Headers and authentication
 * 
 * Run: npm run test:api
 */

const { test, expect } = require('@playwright/test');

// Using JSONPlaceholder - a free fake REST API for testing
const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Tests - Users Endpoint', () => {
  
  test('Tutorial 4.1 - GET all users', async ({ request }) => {
    // Make GET request
    const response = await request.get(`${BASE_URL}/users`);
    
    // Verify status code
    expect(response.status()).toBe(200);
    console.log('✓ Status code: 200');
    
    // Parse response body
    const users = await response.json();
    
    // Validate response
    expect(users.length).toBeGreaterThan(0);
    expect(Array.isArray(users)).toBe(true);
    console.log(`✓ Received ${users.length} users`);
    
    // Validate first user structure
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
    expect(users[0]).toHaveProperty('username');
    console.log('✓ User object structure validated');
  });

  test('Tutorial 4.2 - GET single user by ID', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${BASE_URL}/users/${userId}`);
    
    expect(response.status()).toBe(200);
    
    const user = await response.json();
    
    // Verify specific user data
    expect(user.id).toBe(userId);
    expect(user.name).toBeTruthy();
    expect(user.email).toContain('@');
    console.log(`✓ User ${userId} details retrieved successfully`);
  });

  test('Tutorial 4.3 - GET non-existent user (404)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/999999`);
    
    // Verify 404 status for non-existent resource
    expect(response.status()).toBe(404);
    console.log('✓ 404 status returned for non-existent user');
  });

  test('Tutorial 4.4 - POST create new user', async ({ request }) => {
    const newUser = {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      phone: '1-234-567-8900',
      website: 'johndoe.com'
    };
    
    const response = await request.post(`${BASE_URL}/users`, {
      data: newUser
    });
    
    // Verify 201 Created status
    expect(response.status()).toBe(201);
    console.log('✓ User created successfully');
    
    const createdUser = await response.json();
    
    // Verify created user data
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.email).toBe(newUser.email);
    expect(createdUser.id).toBeDefined();
    console.log(`✓ Created user ID: ${createdUser.id}`);
  });

  test('Tutorial 4.5 - PUT update user', async ({ request }) => {
    const userId = 1;
    const updatedData = {
      name: 'John Updated',
      email: 'john.updated@example.com'
    };
    
    const response = await request.put(`${BASE_URL}/users/${userId}`, {
      data: updatedData
    });
    
    expect(response.status()).toBe(200);
    
    const updatedUser = await response.json();
    expect(updatedUser.name).toBe(updatedData.name);
    expect(updatedUser.email).toBe(updatedData.email);
    console.log('✓ User updated successfully');
  });

  test('Tutorial 4.6 - PATCH partial update', async ({ request }) => {
    const userId = 1;
    const partialUpdate = {
      email: 'newemail@example.com'
    };
    
    const response = await request.patch(`${BASE_URL}/users/${userId}`, {
      data: partialUpdate
    });
    
    expect(response.status()).toBe(200);
    
    const user = await response.json();
    expect(user.email).toBe(partialUpdate.email);
    console.log('✓ User partially updated');
  });

  test('Tutorial 4.7 - DELETE user', async ({ request }) => {
    const userId = 1;
    const response = await request.delete(`${BASE_URL}/users/${userId}`);
    
    expect(response.status()).toBe(200);
    console.log('✓ User deleted successfully');
  });
});

test.describe('API Tests - Posts Endpoint', () => {
  
  test('Tutorial 4.8 - GET all posts', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    
    // Validate post structure
    expect(posts[0]).toHaveProperty('userId');
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('body');
    console.log(`✓ Retrieved ${posts.length} posts`);
  });

  test('Tutorial 4.9 - GET posts by user ID', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${BASE_URL}/posts?userId=${userId}`);
    
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    
    // Verify all posts belong to the user
    posts.forEach(post => {
      expect(post.userId).toBe(userId);
    });
    console.log(`✓ Retrieved ${posts.length} posts for user ${userId}`);
  });

  test('Tutorial 4.10 - CREATE new post', async ({ request }) => {
    const newPost = {
      title: 'Test Post from Playwright',
      body: 'This is a test post created via API automation',
      userId: 1
    };
    
    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost
    });
    
    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
    console.log(`✓ Post created with ID: ${createdPost.id}`);
  });
});

test.describe('API Tests - Comments Endpoint', () => {
  
  test('Tutorial 4.11 - GET comments for a post', async ({ request }) => {
    const postId = 1;
    const response = await request.get(`${BASE_URL}/posts/${postId}/comments`);
    
    expect(response.status()).toBe(200);
    
    const comments = await response.json();
    expect(comments.length).toBeGreaterThan(0);
    
    // Verify comment structure
    expect(comments[0]).toHaveProperty('postId');
    expect(comments[0]).toHaveProperty('id');
    expect(comments[0]).toHaveProperty('name');
    expect(comments[0]).toHaveProperty('email');
    expect(comments[0]).toHaveProperty('body');
    
    // Verify all comments belong to the post
    comments.forEach(comment => {
      expect(comment.postId).toBe(postId);
    });
    console.log(`✓ Retrieved ${comments.length} comments for post ${postId}`);
  });

  test('Tutorial 4.12 - Validate response headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`);
    
    // Check response headers
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
    console.log('✓ Content-Type header validated');
    
    // Check for common security headers
    console.log('Response headers:', headers);
  });
});

test.describe('API Tests - Error Handling', () => {
  
  test('Tutorial 4.13 - Handle invalid endpoint', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/invalid-endpoint`);
    
    expect(response.status()).toBe(404);
    console.log('✓ 404 error handled correctly');
  });

  test('Tutorial 4.14 - Handle malformed data', async ({ request }) => {
    // Note: JSONPlaceholder is lenient, but this demonstrates the approach
    const response = await request.post(`${BASE_URL}/posts`, {
      data: {
        // Missing required fields
        invalidField: 'test'
      }
    });
    
    // JSONPlaceholder still returns 201, but in real APIs this might fail
    console.log(`✓ Response status: ${response.status()}`);
  });
});

test.describe('API Tests - Performance', () => {
  
  test('Tutorial 4.15 - Measure response time', async ({ request }) => {
    const startTime = Date.now();
    
    const response = await request.get(`${BASE_URL}/users`);
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(2000); // Should respond within 2 seconds
    
    console.log(`✓ Response time: ${responseTime}ms`);
  });

  test('Tutorial 4.16 - Parallel API requests', async ({ request }) => {
    const startTime = Date.now();
    
    // Make multiple requests in parallel
    const [users, posts, comments] = await Promise.all([
      request.get(`${BASE_URL}/users`),
      request.get(`${BASE_URL}/posts`),
      request.get(`${BASE_URL}/comments`)
    ]);
    
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    // Verify all requests succeeded
    expect(users.status()).toBe(200);
    expect(posts.status()).toBe(200);
    expect(comments.status()).toBe(200);
    
    console.log(`✓ Completed 3 parallel requests in ${totalTime}ms`);
  });
});
