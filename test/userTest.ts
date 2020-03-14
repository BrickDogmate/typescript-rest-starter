import * as base from './base';
import * as chai from 'chai';
import { ERROR_MESSAGE } from '../src/common/ErrorMessages';
import chaiHttp = require('chai-http');
const server = require('../src/server');
const expect = chai.expect;
chai.use(chaiHttp);

describe.only('userTest', () => {
  const agent = chai.request.agent(server).keepOpen();

  before(async () => {
    await base.connectServer();
  });

  it('사용자 리스트 가져오기', (done) => {
    agent.get('/api/users')
    .end((err, res) => {
      expect(res.body.error).to.be.undefined;
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('userList');
      expect(res.body.userList).to.deep.eq([
        {
          userId: res.body.userList[0].userId,
          userName: '이지은2',
        },
        {
          userId: res.body.userList[1].userId,
          userName: '이지은1',
        }
      ])
      done();
    });
  });

});
