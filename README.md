# API for a Social Network

### ⚠️ Project Under Development

Thank you for visiting! Please note that this project is currently under active development and is subject to changes and improvements. Features, functionality, and documentation may evolve as the project progresses.

Thank you for visiting!


## Functional Requirements

- Users can sign up and log in.
- Users can view posts from other users.
- Users can create posts.
- Users can comment on posts.
- Users can like posts.
- Users can edit their profiles.

## Non Functional Requirements

- Use bcrypt to securely hash user passwords.
- Use PostgreSQL for database.
- Use PrismaORM for database management and migrations.
- Use Node.js and NestJS for building the backend services.
- Use Docker to containerize the services for consistent deployment.
- Follow a server-client architecture to separate concerns.

## Entities

- Users
- Posts
- Comments
- Likes

## Entity–relationship model

<img src="./docs/entity-relationship-diagram.jpg" alt="Entity Relationship Diagram" />

## Features

### User

- signup user (public)
- login user (public)
- edit profile (public)

### Post

- view posts (public)
- create post (Logged in)
- edit post (Logged in)
- delete post (Logged in)
- like posts (Logged in)

### Comment

- comment post (Logged in)
- Reply to a comment (Logged in)
- edit a comment (Logged in)
- delete a comment (Logged in)

### Like

- Like a post (Logged in)
- Unlike a post (Logged in)

## Running the project locally

### Requirements

- Docker and Docker Compose installed.

### 1. Setup .env file

Create a file called .env on project's root folder, and put this model:

```
# database
POSTGRES_USER=demo_user
POSTGRES_PASSWORD=secure_password
POSTGRES_DB=social_media

# connection with PrismaORM
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public"

# JWT configuration
JWT_SECRET=my_random_secret_key
JWT_TOKEN_AUDIENCE=http://localhost:3000
JWT_TOKEN_ISSUER=http://localhost:3000
JWT_TTL="30d"
```

### 2. Starting the services

Tu run the project just go to the project's root folder and run:

```
docker compose up -d
```

#### This will start the api on http://localhost:3000 and the database at localhost:5432

## Api Endpoints

## User

- POST /auth/register - (public)
- POST /auth/login - (public)
- PUT /users/profile - (authenticated)

## Post

- GET /posts - (public)
- POST /posts - (authenticated)
- PUT /posts/:postId - (authenticated)
- DELETE /posts/:postId - (authenticated)
- POST /posts/:postId/like - (authenticated)

## Comment

- POST /comments/:postId/comments - (authenticated)
- POST /comments/:commentId/reply - (authenticated)
- PUT /comments/:commentId - (authenticated)
- DELETE /comments/:commentId - (authenticated)

## Like

- POST /likes/:postId - (authenticated)
- DELETE /likes/:postId - (authenticated)

