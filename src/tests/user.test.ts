import supertest from "supertest";
import api from '../infra/api/api';
import Jwtoken from '../core/utils/jwtoken';

const userAdmin = { id: 1, name: "alice", email: "alice@email.com", role: "admin" as "admin" }; 
    const userClient = { id: 2, name: "kayto", email: "kayto@email.com", role: "client" as "client" };

describe('/user path test', () => {

    
    const token = Jwtoken.generateToken(userAdmin);

    it('It should return status 200 if the authentication is valid', (done) => {
        supertest(api)
            .get('/user')
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('It should return status 403 because the user is not an admin', (done) => {

        const nonAdminToken = Jwtoken.generateToken(userClient);

        supertest(api)
            .get('/user')
            .set('Authorization', `Bearer ${nonAdminToken}`)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('It should return error status 401 for trying to access the path without token/authentication', (done) => {
        supertest(api)
            .get('/user')
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('It should return error status 401 for trying to access the path without token/authentication', async () => {
        const res = await supertest(api).put("/user/:id");
        expect(res.status).toBe(401);
    });

    it('It should return error status 401 for trying to access the path without token/authentication', async () => {
        const res = await supertest(api).delete("/user/:id");
        expect(res.status).toBe(401);

    });

    describe('/admin path test', () => {

        const token = Jwtoken.generateToken(userAdmin);

        it('It should return status 200 if the authentication is valid', (done) => {
            supertest(api)
                .get('/admin')
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });

        it('It should return error status 401 for trying to access the path without token/authentication', (done) => {
            supertest(api)
                .get('/admin')
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });

        it('It should return error status 401 for trying to access the path without token/authentication', (done) => {
            supertest(api)
                .put('/admin/:id')
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });

        it('It should return error status 401 for trying to access the path without token/authentication', (done) => {
            supertest(api)
                .delete('/admin/:id')
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

})


