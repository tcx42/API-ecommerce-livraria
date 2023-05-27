import request from 'supertest';
import jwt from 'jsonwebtoken';
import api from '../infra/api/api'; 

// Função auxiliar para gerar um token JWT
function generateToken(payload: object): string {
  const secret = 'iFj2BpBdkb0DdSjwcuUn'; 
  const options = { expiresIn: '1h' }; // Define o tempo de expiração do token
  return jwt.sign(payload, secret, options);
}


describe('/product path test', () => {

    const userAdmin = { name: "alice", email: "alice@email.com", role: "admin" }; 
    const userClient = { name: "kayto", email: "kayto@email.com", role: "client" }; 

  it('It should return status 200 because this is a free path', (done) => {
     request(api)
      .get('/product') 
      .expect(200) 
      .end((err, res) => {
            done();
      });
  });

  it('It should return status 200 because this is a free path', (done) => {
    request(api)
     .get('/product/:category') 
     .expect(200) 
     .end((err, res) => {
           done();
     });
 });

  it('/get - It should return status 200 if the authentication is valid', (done) => {

    const token = generateToken(userAdmin); 

    request(api)
      .post('/product') 
      .set('Authorization', `Bearer ${token}`) 
      .expect(200) 
      .end((err, res) => {
            done();
      });
  });

  it('/put - It should return status 200 if the authentication is valid', (done) => {

    const token = generateToken(userAdmin); 

    request(api)
      .put('/product/:id') 
      .set('Authorization', `Bearer ${token}`) 
      .expect(200) 
      .end((err, res) => {
            done();
      });
  });

  it('/delete - It should return status 204 if the authentication is valid', (done) => { 

    const token = generateToken(userAdmin); 

    request(api)
      .delete('/product/:id') 
      .set('Authorization', `Bearer ${token}`) 
      .expect(204) 
      .end((err, res) => {
            done();
      });
  });

  it('It should return status 403 because this path is exclusive for the admin user', (done) => {

    const token = generateToken(userClient); 

    request(api)
      .post('/product') 
      .set('Authorization', `Bearer ${token}`) 
      .expect(403) 
      .end((err, res) => {
            done();
      });
  });

  it('It should return error status 401 for trying to acess the path without token/authentication', (done) => {
    request(api)
      .post('/product') 
      .expect(401) 
      .end((err, res) => {
        done();
      });
  });

});


