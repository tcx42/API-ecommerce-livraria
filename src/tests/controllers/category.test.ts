import request from 'supertest';
import api from '../../infra/api/api'; 
import CategoryRepository from '../../repositories/category/category.repository';

describe('CategoryController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET /categories', () => {
    it('deve retornar todas as categorias', async () => {
      const categoriesMock = [
        { id: 1, name: 'Categoria 1', description: 'Descrição 1' },
        { id: 2, name: 'Categoria 2', description: 'Descrição 2' },
      ];

      const findAllMock = jest.spyOn(CategoryRepository, 'findAll').mockResolvedValueOnce(categoriesMock);

      const response = await request(api).get('/categories');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(categoriesMock);
      expect(findAllMock).toHaveBeenCalled();
    });
  });

  describe('POST /categories', () => {
    it('deve criar uma nova categoria', async () => {
      const newCategory = { name: 'Nova Categoria', description: 'Descrição da nova categoria' };
      const createdCategory = { id: 1, ...newCategory };

      const createMock = jest.spyOn(CategoryRepository, 'create').mockResolvedValueOnce(createdCategory);

      const response = await request(api).post('/categories').send(newCategory);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdCategory);
      expect(createMock).toHaveBeenCalledWith(newCategory);
    });
  });

  describe('PUT /categories/:id', () => {
    it('deve atualizar uma categoria existente', async () => {
      const categoryId = 1;
      const updatedCategory = { id: categoryId, name: 'Categoria Atualizada', description: 'Descrição atualizada' };
  
      const updateMock = jest.spyOn(CategoryRepository, 'update').mockResolvedValueOnce(updatedCategory);
  
      const response = await request(api).put(`/categories/${categoryId}`).send(updatedCategory);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedCategory);
      expect(updateMock).toHaveBeenCalledWith(categoryId, updatedCategory);
    });
  });
  
  

  describe('DELETE /categories/:id', () => {
    it('deve excluir uma categoria existente', async () => {
      const categoryId = 1;

      const deleteMock = jest.spyOn(CategoryRepository, 'delete').mockResolvedValueOnce();

      const response = await request(api).delete(`/categories/${categoryId}`);

      expect(response.status).toBe(204);
      expect(deleteMock).toHaveBeenCalledWith(categoryId);
    });
  });
});
