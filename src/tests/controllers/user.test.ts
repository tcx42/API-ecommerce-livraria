import request from 'supertest';
import api from '../../infra/api/api';

describe('Teste do UserController', () => {
  it('deve fazer login com sucesso', async () => {
    const loginData = {
      email: 'teste@example.com',
      password: 'senha123',
    };

    const response = await request(api)
      .post('/users/login')
      .send(loginData);

    expect(response.status).toBe(200);
    expect(response.headers['set-cookie']).toBeDefined();
  });

  it('deve fazer logout com sucesso', async () => {
    const response = await request(api)
      .post('/users/logout');

    expect(response.status).toBe(200);
    expect(response.headers['set-cookie']).toBeDefined();
  });

  it('deve retornar todos os usuários', async () => {
    const response = await request(api)
      .get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('deve retornar um usuário pelo ID', async () => {
    const userId = 1; // Defina um ID de usuário válido para o teste

    const response = await request(api)
      .get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('role');
  });

  it('deve retornar um usuário pelo email', async () => {
    const userEmail = 'teste@example.com'; // Defina um email de usuário válido para o teste

    const response = await request(api)
      .get(`/users/email/${userEmail}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('role');
  });

  it('deve criar um novo usuário admin', async () => {
    const userData = {
      name: 'Novo Admin',
      email: 'admin@example.com',
      password: 'senha123',
    };

    const response = await request(api)
      .post('/users/admin')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('role');
    expect(response.body.role).toBe('admin');
  });

  it('deve criar um novo usuário cliente', async () => {
    const userData = {
      name: 'Novo Cliente',
      email: 'cliente@example.com',
      password: 'senha123',
    };

    const response = await request(api)
      .post('/users/client')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('role');
    expect(response.body.role).toBe('client');
  });

  it('deve atualizar um usuário existente', async () => {
    const userEmail = 'teste@example.com'; // Defina um email de usuário válido para o teste
    const updatedUserData = {
      name: 'Nome Atualizado',
      password: 'novasenha123',
    };

    const response = await request(api)
      .put(`/users/${userEmail}`)
      .send(updatedUserData);

      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('role');
      expect(response.body.name).toBe(updatedUserData.name);
    });

  it('deve excluir um usuário', async () => {
    const userEmail = 'teste@example.com'; // Defina um email de usuário válido para o teste

    const response = await request(api)
      .delete(`/users/${userEmail}`);

    expect(response.status).toBe(204);
  });
});

