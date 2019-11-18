const request = require('supertest');

const app = require('../server/server');
const PORT = 3535;

app.listen(PORT, () => console.log(`app being tested on ${PORT}`));

const server = `http://localhost:${PORT}`;

describe('basic route serving', () => {
  describe('GET', () => {

    describe('/', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      })
    })
  })

  describe('/todo', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/todo')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);
      });
    })
    
    describe('POST', () => {
      it('it should create a new post and respond with 200 status and application/json content type', () => {
        let data = {
          task: 'hi hi',
          date: new Date()
        }
        return request(server)
        .post('/todo')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      })
    })
  })
})