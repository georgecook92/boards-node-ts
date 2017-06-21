import * as mocha from 'mocha';
import * as chai from 'chai';
const chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

// describe('GET api/user', () => {

//   it('responds with JSON', (done) => {
//     return chai.request(app).post('/api/user')
//     .end(function(err, res) {
//         expect(res.status).to.equal(200);
//         expect(res).to.be.json;
//         done();                               // <= Call done to signal callback end
//     });
//   });

// });