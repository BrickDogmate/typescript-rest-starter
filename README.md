# typescript-rest-starter

`typescript-rest`를 활용한 REST API 서버입니다.

https://github.com/thiagobustamante/typescript-rest

### DB
* MySQL SERVER 설치가 필요합니다.
* user_info
```
CREATE TABLE `user_info` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL DEFAULT '',
  `phone_number` varchar(20) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_info_phone_number_uindex` (`phone_number`),
  KEY `user_info_user_name_index` (`user_name`),
  KEY `user_info_created_at_index` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='사용자 정보';
```

### .env.test
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=brick
DB_NAME=brick_test
```

* npm run dev
  > dev 서버 실행

* npm run test
  > 테스트 코드를 실행합니다.

* npm run test:db
  > typeorm 로그를 출력하면서 test 실행합니다.

* npm run build
  > js 로 빌드합니다.

* npm run clean
  > 빌드된 dist 디렉토리 삭제

* npm run serve
  > production 서버 실행
