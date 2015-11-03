
var loopback = require('loopback');
var app = module.exports = loopback();

var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest(app.get('url'));
console.log("URL: " + app.get('url'));

describe('Authentication', function() {

  it('errors if wrong basic auth', function(done) {
    api.get('/Questions')
    .set('x-api-key', '123myapikey')
    .auth('incorrect', 'credentials')
    .expect(401, done)
  });

  it('errors if bad x-api-key header', function(done) {
    api.get('/Questions')
    .auth('correct', 'credentials')
    .expect(401)
    .end(function(err,res) {
      if(err) return done(err);
      
      res.body.error.should.have.property("message").and.to.equal("Authorization Required");
      done();
    })
  });

});


/*describe('/blog', function() {

  it('returns blog posts as JSON', function(done) {
    api.get('/blog')
    .set('x-api-key', '123myapikey')
    .auth('correct', 'credentials')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.have.property('posts').and.be.instanceof(Array);
      done();
    });
  });

});*/