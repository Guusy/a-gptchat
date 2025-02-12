# GPT chat

A clone of chatgpt UI.

## Getting Started

### Enviroment variables

Copy `.env.example` to a `.env` file and fill with your credentials

#### AI integration

If you want to mock the AI integration, make sure to have `STUB_AI="true"` env variable in place, otherwise is gonna try to connect to openAI

#### Auth

This repo is using [next-auth](https://next-auth.js.org/) to handle the login with google SSO.

So you need to create yours credentials, check the [google docs](https://developers.google.com/identity/protocols/oauth2)


#### Redis

We are using redis, to have handle the users that are allowed to login in platform, setup `REDIS_URL` env variable, with your local redis.

### Run the server

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Test e2e

Make sure you have your local server running

##### Run in debug mode

```bash
    npm run test:e2e:open
```    

##### Run in headless mode

```bash
    npm run test:e2e
```    