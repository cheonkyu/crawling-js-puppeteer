# Crawling-js-puppeteer

크롤링 구현해보기 - localhost:3000로 브라우저 디버깅 원격와 프록시 서버를 통해 웹사이트 접속

- puppeteer: crawler, scamper
- docker, docker-compose
- tor : proxy-server
  tor, Docker chrome(browserless 이미지)를 이용한 proxy server + remote debug를 이용한 크롤러 구현
- htop : cpu monitoring

## tor 설정

```
$ brew install tor
```

/opt/homebrew/etc/tor/torrc 파일 추가

```sh
SocksPort 0.0.0.0:9050
ControlPort 0.0.0.0:9051
```

```sh
$ brew services start tor
```

## 브라우저 실행 (docker)

```
$ docker-compose up -d
```

## 크롤링 실행

```shell
$ yarn start
```

## Reference

### 크롬브라우저 설정

https://github.com/puppeteer/puppeteer/issues/3938

https://peter.sh/experiments/chromium-command-line-switches/#disable-virtual-keyboard

### browserless 사이트

https://docs.browserless.io/docker/quickstart

### 크롤링(스크랩) 가이드

https://scrapeops.io/web-scraping-playbook/
