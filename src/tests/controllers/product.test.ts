import request from 'supertest';
import api from '../../infra/api/api'; 

describe('Teste do ProductController', () => {
  it('deve retornar todos os produtos', async () => {
    const response = await request(api)
      .get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('deve retornar todos os produtos de uma categoria', async () => {
    const category = 'eletrônicos'; 

    const response = await request(api)
      .get(`/products/category/${category}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('deve criar um novo produto', async () => {
    const productData = {
      name: 'Novo Produto',
      category: 'eletrônicos',
      price: 99.99,
    };

    const response = await request(api)
      .post('/products')
      .send(productData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(productData.name);
    expect(response.body.category).toBe(productData.category);
    expect(response.body.price).toBe(productData.price);
  });

  it('deve atualizar um produto existente', async () => {
    const productId = 1; 
    const updatedProductData = {
      name: 'Produto Atualizado',
      price: 149.99,
    };

    const response = await request(api)
      .put(`/products/${productId}`)
      .send(updatedProductData);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(productId);
    expect(response.body.name).toBe(updatedProductData.name);
    expect(response.body.price).toBe(updatedProductData.price);
  });

  it('deve excluir um produto existente', async () => {
    const productId = 1; 

    const response = await request(api)
      .delete(`/products/${productId}`);

    expect(response.status).toBe(204);
  });

  it('deve adicionar uma nova imagem a um produto existente', async () => {
    const productId = 1; 

    const response = await request(api)
      .post(`/products/${productId}/images`)
      .attach('image', '/path/to/image.jpg'); 

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.productId).toBe(productId);
    expect(response.body.imagePath).toBeDefined();
  });

  it('deve excluir a imagem de um produto existente', async () => {
    const productId = 1; 

    const response = await request(api)
      .delete(`/products/${productId}/images`);

    expect(response.status).toBe(204);
  });
});
