import supertest from 'supertest';
import api from '../infra/api/api';
import Jwtoken from '../core/utils/jwtoken';




describe('/category path test', () => {

    const userAdmin = { name: "alice", email: "alice@email.com", role: "admin" as "admin" }; 
    const userClient = { name: "kayto", email: "kayto@email.com", role: "client" as "client"}; 

    it('/get - It should return status 200 because this is a free path', (done) => {
       supertest(api)
        .get('/category') 
        .expect(200) 
        .end((err, res) => {
              done();
        });
    });


    it('/post - It should return status 200 if the authentication is valid', (done) => {
  
        const token = Jwtoken.generateToken(userAdmin); 
    
        supertest(api)
          .post('/category') 
          .set('Authorization', `Bearer ${token}`) 
          .expect(200) 
          .end((err, res) => {
                done();
          });
      });

      it('/pst - It should return status 403 because this path is exclusive for the admin user', (done) => {
    
        const token = Jwtoken.generateToken(userClient); 
    
        supertest(api)
          .put('/category') 
          .set('Authorization', `Bearer ${token}`) 
          .expect(403) 
          .end((err, res) => {
                done();
          });
      });
      
    it('/put - It should return status 200 if the authentication is valid', (done) => {
  
        const token = Jwtoken.generateToken(userAdmin); 
    
        supertest(api)
          .put('/order') 
          .set('Authorization', `Bearer ${token}`) 
          .expect(200) 
          .end((err, res) => {
                done();
          });
      });
    
      it('/put - It should return status 403 because this path is exclusive for the admin user', (done) => {
    
        const token = Jwtoken.generateToken(userClient); 
    
        supertest(api)
          .put('/category/:id') 
          .set('Authorization', `Bearer ${token}`) 
          .expect(403) 
          .end((err, res) => {
                done();
          });
      });
    
      it('/delete - It should return status 204 if the authentication is valid', (done) => { 
    
        const token = Jwtoken.generateToken(userAdmin); 
    
        supertest(api)
          .delete('/order/:id') 
          .set('Authorization', `Bearer ${token}`) 
          .expect(204) 
          .end((err, res) => {
                done();
          });
      });

      it('/delete - It should return status 204 if the authentication is valid', (done) => { 
    
        const token = Jwtoken.generateToken(userClient); 
    
        supertest(api)
          .delete('/order/:id') 
          .set('Authorization', `Bearer ${token}`) 
          .expect(403) 
          .end((err, res) => {
                done();
          });
      });
    
      it('It should return error status 400 because the category is invalid', (done) => {
        supertest(api)
          .get('/category/invalid-category') 
          .expect(400) 
          .end((err, res) => {
            done();
          });
      });

      it('/post - It should return error status 401 for trying to acess the path without token/authentication', (done) => {
        supertest(api)
          .get('/caterogy') 
          .expect(401) 
          .end((err, res) => {
            done();
          });
      });
  
  });
  





/*import { Router } from 'express';
import CategoryController from '../controllers/category/category.controller';
import categoryRoutes from '../routes/category/category.routes';


const userAdmin = { name: "alice", email: "alice@email.com", role: "admin" }; 
const userClient = { name: "kayto", email: "kayto@email.com", role: "client" }; 

// Mock do CategoryController
jest.mock('../../controllers/category/category.controller', () => ({
  getAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));



  const mockRequest = {
    body: {
      name: 'Category 1',
      description: 'Category description',
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new category', async () => {
    
    (CategoryController.create as jest.Mock).mockResolvedValue(mockRequest.body);

    const token = Jwtoken.generateToken(userAdmin);
    const response = await request(api)
      .post('/category')
      .set('Authorization', `Bearer ${token}`) 
      .send(mockRequest)
      .expect(200);

    // Verifique se o método create do CategoryController foi chamado corretamente
    expect(CategoryController.create).toHaveBeenCalledWith(mockRequest.body);

    // Verifique a resposta da requisição
    expect(response.body).toEqual(mockRequest.body);
  });

  it('should return an error when creating a category with the same name', async () => {
   
    (CategoryController.create as jest.Mock).mockRejectedValue(new Error('Category name already exists'));

    const token = Jwtoken.generateToken(userAdmin);
    const response = await request(api)
      .post('/category')
      .set('Authorization', `Bearer ${token}`) 
      .send(mockRequest)
      .expect(400);

    
    expect(CategoryController.create).toHaveBeenCalledWith(mockRequest.body);

    // Verifique a resposta da requisição
    expect(response.body).toEqual({ error: 'Category name already exists' });
  });
});
*/


