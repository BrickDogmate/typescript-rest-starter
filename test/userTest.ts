import * as base from './base';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { getManager, getRepository, MoreThan } from 'typeorm';
import { UserInfoEntity } from '../src/models/entity/UserInfoEntity';
const server = require('../src/server');
const expect = chai.expect;
chai.use(chaiHttp);

describe('userTest', () => {
  const agent = chai.request.agent(server).keepOpen();

  before(async () => {
    await base.connectServer();
    const userInfo1 = new UserInfoEntity();
    userInfo1.userName = '이지은1';
    userInfo1.phoneNumber = '010-0000-0001';
    await getManager().save(userInfo1);
    const userInfo2 = new UserInfoEntity();
    userInfo2.userName = '이지은2';
    userInfo2.phoneNumber = '010-0000-0002';
    await getManager().save(userInfo2);
  });

  after(async () => {
    await getRepository(UserInfoEntity).delete({ userId: MoreThan(0) });
  })

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
