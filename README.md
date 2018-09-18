# hotel-reservation-crawler-test

[![Build Status](https://travis-ci.com/ypconstante/hotel-reservation-crawler-test.svg?branch=master)](https://travis-ci.com/ypconstante/hotel-reservation-crawler-test)
[![codecov](https://codecov.io/gh/ypconstante/hotel-reservation-crawler-test/branch/master/graph/badge.svg)](https://codecov.io/gh/ypconstante/hotel-reservation-crawler-test)


# Pre-reqs
- [Node.js 8.1.3](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)

# Running locally
```$sh
yarn install
yarn start
```

# Deploying the app
```$sh
yarn install
yarn run build
yarn run serve
```

# Endpoints
```
GET /buscar

Query parmas
- dataCheckIn - data de check in no formato ISO - exemplo 2019-06-01
- dataCheckOut - data de check out no formato ISO - exemplo 2019-06-02

Exemplo
GET http://127.0.0.1:3000/buscar?dataCheckIn=2019-06-01&dataCheckOut=2019-06-02
```
