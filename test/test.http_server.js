const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const httpserver = require('../http_server');
const figlet = require('figlet');



describe('http-server', () => {

  let server = chai.request(httpserver);

  it('hits the root and gets a 200 Ok', done => {
    server
      .get('/')
      .end(function(err, res){
        if (err) return done(err);
        assert.equal(res.status, 200);
        done();
      })
  });

  it('sends a query string and processes it', done => {

    const input = 'type: awesome';
    figlet(input, (err, message) => {
      if (err) done(err);

      server
        .get('/dinosaurs?type=awesome')
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.type, 'text/plain');
          assert.include(res.text, message);
          done();
        })
    })
  })
});

