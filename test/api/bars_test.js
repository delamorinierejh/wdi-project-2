require('../spec_helper');

const Bar = require('../../models/bar');
const User = require('../../models/user');


let TOKEN;

describe('Bars controller test', function(done){

  beforeEach(done => {
    Bar.collection.drop();
    done();
  });

  describe('GET /api/bars/soho', function(done){


    beforeEach(done => {
      const user = new User({
        username: 'test',
        email: 'test@test.com',
        password: 'password',
        passwordConfirmation: 'password'
      });

      user.save((err, user) => {
        api.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'password'
        }).end((err, res) => {
          TOKEN = res.body.token;
          done();
        });
      });
    });

    beforeEach(done => {
      const restaurant = new Bar({
        name: '123',
        lat: '123',
        lng: '123',
        place_id: '123',
        image: '123',
        openingHours: ['1', '2'],
        address: '123',
        area: '123',
        searchString: '123',
        rating: 123,
        website: '123'
      });
      restaurant.save((err, bar) => {
        done();
      });
    });

    it('should return a 200 response', function(done) {
      api
      .get('/api/bars/123')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(200, done);
    });

    it('should respond with a JSON object', done => {
      api
      .get('/api/bars/123')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${TOKEN}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        console.log(res.body);
        done();
      });
    });

    it('should return an object with the following properties', done => {
      api.get('/api/bars/123')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${TOKEN}`)
      .end((err, res) => {
        console.log(res.body);
        expect(res.body)
        .to.have.property('bar')
        .and.have.any.keys([
          '_id',
          'name',
          'lat',
          'lng',
          'rating',
          'createdAt',
          'updatedAt',
          'address',
          'area'
        ]);
        done();
      });

    });

  });




});
