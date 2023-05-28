import supertest from 'supertest';
import api from '../infra/api/api';
import Jwtoken from '../core/utils/jwtoken';


describe('/order path test', () => {

    const userAdmin = { name: "alice", email: "alice@email.com", role: "admin" as "admin" }; 
    const userClient = { name: "kayto", email: "kayto@email.com", role: "client" as "client" }; 

  it('/get - It should return status 200 if the authentication is valid', (done) => {

    const token = Jwtoken.generateToken(userAdmin); 

    supertest(api)
      .get('/order') 
      .set('Authorization', `Bearer ${token}`) 
      .expect(200) 
      .end((err, res) => {
            done();
      });
  });

  it('/put - It should return status 200 if the authentication is valid', (done) => {

    const token = Jwtoken.generateToken(userAdmin); 

    supertest(api)
      .put('/order/:id') 
      .set('Authorization', `Bearer ${token}`) 
      .expect(200) 
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

  it('It should return status 403 because this path is exclusive for the admin user', (done) => {

    const token = Jwtoken.generateToken(userClient); 

    supertest(api)
      .get('/order') 
      .set('Authorization', `Bearer ${token}`) 
      .expect(403) 
      .end((err, res) => {
            done();
      });
  });

  it('It should return error status 401 for trying to acess the path without token/authentication', (done) => {
    supertest(api)
      .get('/order') 
      .expect(401) 
      .end((err, res) => {
        done();
      });
  });

});