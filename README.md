# GPT chat

A clone of chatgpt UI.

## Getting Started

### Enviroment variables

Copy `.env.example` to a `.env` file and fill with your credentials

#### AI integration

If you want to mock the AI integration, make sure to have `STUB_AI="true"` env variable in place, otherwise is gonna try to connect to openAI

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