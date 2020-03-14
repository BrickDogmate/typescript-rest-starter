import * as base from './base';
import * as chai from 'chai';
import { ERROR_MESSAGE } from '../src/common/ErrorMessages';
import chaiHttp = require('chai-http');
const server = require('../src/server');
const expect = chai.expect;
chai.use(chaiHttp);

describe('helloTest', () => {
  const agent = chai.request.agent(server).keepOpen();

  before(async () => {
    await base.connectServer();
  });

  it('존재하지 않는 경로 요청', (done) => {
    agent.get('/hello/name')
    .end((err, res) => {
      expect(res.body.error).to.eq(ERROR_MESSAGE.NOT_FOUND_PATH);
      expect(res).to.have.status(404);
      done();
    });
  });

  it('서버 에러', (done) => {
    agent.get('/api/hello/error')
    .end((err, res) => {
      expect(res.body.error).to.eq(ERROR_MESSAGE.SYSTEM_ERROR);
      expect(res).to.have.status(500);
      done();
    });
  });

  it('hello name 요청', (done) => {
    agent.get('/api/hello/LEE-JI-EUN')
    .end((err, res) => {
      expect(res.body.error).to.be.undefined;
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('name');
      expect(res.body.name).to.eq('LEE-JI-EUN');
      done();
    });
  });

  it('hello name 요청 : 잘못된 이름', (done) => {
    agent.get('/api/hello/*')
    .end((err, res) => {
      expect(res.body.error).to.eq(ERROR_MESSAGE.WRONG_USER_NAME);
      expect(res).to.have.status(406);
      done();
    });
  });

  it('hello name 요청 : _ 혹은 space 허용되는지 확인', (done) => {
    agent.get('/api/hello/LEE JI EUN_')
    .end((err, res) => {
      expect(res.body.error).to.be.undefined;
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('name');
      expect(res.body.name).to.eq('LEE JI EUN_');
      done();
    });
  });

});
