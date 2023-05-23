import request from 'supertest';
import api from '../../infra/api/api';

describe('Teste do OrderController', () => {
    it('deve criar um pedido com sucesso', async () => {
      const orderData = {
        userEmail: 'teste@example.com',
        couponId: 1,
        products: ['Produto 1', 'Produto 2'],
      };
  
      const response = await request(api)
        .post('/orders')
        .send(orderData);
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.userId).toBe(1); 
      expect(response.body.products).toEqual(orderData.products);
    });
  
    it('deve retornar todos os pedidos de um usuário', async () => {
      const userId = 1; 
  
      const response = await request(api)
        .get(`/orders/users/${userId}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  
    it('deve excluir um pedido com sucesso', async () => {
      const orderId = 1; 
  
      const response = await request(api)
        .delete(`/orders/${orderId}`);
  
      expect(response.status).toBe(204);
    });
  
    it('deve retornar todos os pedidos', async () => {
      const response = await request(api)
        .get('/orders');
  
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  
    it('deve retornar todos os pedidos de um produto', async () => {
      const productId = 1; 
  
      const response = await request(api)
        .get(`/orders/products/${productId}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });