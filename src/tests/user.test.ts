import supertest from "supertest";
import request from 'supertest';
import jwt from 'jsonwebtoken';
import api from '../infra/api/api'; 

// Função auxiliar para gerar um token JWT
function generateToken(payload: object): string {
  const secret = 'iFj2BpBdkb0DdSjwcuUn'; 
  const options = { expiresIn: '1h' }; // Define o tempo de expiração do token
  return jwt.sign(payload, secret, options);
}


describe('/user path test', () => {
  it('It should return status 200 if the authentication is valid', (done) => {
    const user = { name: "alice", email: "alice@email.com", role: "admin" }; 

    const token = generateToken(user); 

    request(api)
      .get('/user') 
      .set('Authorization', `Bearer ${token}`) // Definir o cabeçalho de autorização com o token JWT
      .expect(200) // Verificar o status da resposta
      .end((err, res) => {
            done();
      });
  });

  it('It should return status 403 because the !user: admin ', (done) => {
    const user = { name: "kayto", email: "kayto@email.com", role: "client" }; 

    const token = generateToken(user); 

    request(api)
      .get('/user') 
      .set('Authorization', `Bearer ${token}`) 
      .expect(403) 
      .end((err, res) => {
            done();
      });
  });

  it('It should return error status 401 for trying to acess the path without token/authentication', (done) => {
    request(api)
      .get('/user') 
      .expect(401) 
      .end((err, res) => {
        done();
      });
  });

    it("It should return error status 401 for trying to acess the path without token/authentication", async () => {
      const res = await supertest(api).put("/user/:id");
      expect(res.status).toBe(401);
    });


    it("It should return error status 401 for trying to acess the path without token/authentication", async () => {
        const res = await supertest(api).delete("/user/:id");
        expect(res.status).toBe(401);
    });

});

describe('/admin path test', () => {
  
    it('It should return status 200 if the authentication is valid', (done) => {
      const user = { name: "alice", email: "alice@email.com", role: "admin" }; // Informações do usuário autenticado
  
      const token = generateToken(user); // Gerar o token JWT com os dados do usuário
  
      request(api)
        .get('/admin') 
        .set('Authorization', `Bearer ${token}`) // Definir o cabeçalho de autorização com o token JWT
        .expect(200) // Verificar o status da resposta
        .end((err, res) => {
              done();
        });
    });
  
    it('It should return error status 401 for trying to acess the path without token/authentication', (done) => {
      request(api)
        .get('/admin') 
        .expect(401) 
        .end((err, res) => {
          done();
        });
    });

    it('It should return error status 401 for trying to acess the path without token/authentication', (done) => {
        request(api)
          .put('/admin/:id') 
          .expect(401) 
          .end((err, res) => {
            done();
          });
      });

      it('It should return error status 401 for trying to acess the path without token/authentication', (done) => {
        request(api)
          .delete('/admin/:id') 
          .expect(401) 
          .end((err, res) => {
            done();
          });
      });
  
  });



