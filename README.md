# GPT Chat

A clone of the ChatGPT UI.

## Getting Started

### Docker Compose

The Docker Compose setup includes PostgreSQL, Redis, and pgAdmin. Run the following command to start everything:

```bash
docker-compose up -d
```

### Environment Variables

Copy `.env.example` to a `.env` file and fill it with your credentials.

#### AI Integration

If you want to mock the AI integration, make sure to set the `STUB_AI="true"` environment variable. Otherwise, it will try to connect to OpenAI.

#### Auth

This repository uses [next-auth](https://next-auth.js.org/) to handle login with Google SSO. You need to create your credentials. Check the [Google Docs](https://developers.google.com/identity/protocols/oauth2) for more information.

#### Redis

We use Redis to handle the users allowed to log in to the platform. Set up the `REDIS_URL` environment variable with your local Redis instance.

Since this app only allows specific emails to log in, you will need to connect to the Redis instance and add these emails to a specific key.

Connect to the Docker instance:

```bash
redis-cli -h localhost -p 6379
```

Add a user:

```bash
SADD allowed_users "YOUR_SSO_EMAIL@gmail.com"
```

Check the set of allowed users:

```bash
    SMEMBERS allowed_users
```

### Run the Server

Install dependencies

```bash
    npm install
```

If you have all the environment variables in place, create a schema and run the database migrations:

```bash
npm run db:migrate
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Test E2E

Make sure you have your local server running.

##### Run in Debug Mode

```bash
npm run test:e2e:open
```

##### Run in Headless Mode

```bash
npm run test:e2e
```


## TODOS

- Use the event stream OpenAI API to improve the UX and response time, instead of a normal HTTP request.

- Change the flow of new chat. We should create a chat with the initial message (user), redirect to the chat/:id, and then send the message to the AI. This new flow will improve the UX because the user will not need to wait for the entire response of the AI to change the view.