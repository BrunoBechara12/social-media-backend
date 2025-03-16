# API for a Social Network


## Functional Requirements

- Users can sign up and log in.
- Users can view posts from other users.
- Users can create posts.
- Users can edit their content in posts.
- Users can comment on posts and reply to other comments.
- Users can like posts.
- Users can edit their profiles and their credentials.

##  Non-Functional Requirements

- Use bcrypt to securely hash user passwords.
- Use PostgreSQL for the database.
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

- Sign up user 
- Login user 
- Edit profile 
- Edit credentials 

### Post

- View posts 
- Create post 
- Edit post 
- Delete post 

### Comment

- View comments
- Create comment 
- Reply a comment 
- Edit comment 
- Delete comment

### Like

- View how many likes a post has 
- Like a post 
- Unlike a post 

# Running the project locally

### Requirements

- Docker and Docker Compose installed.

# Project Setup Guide

## 1. Set up the .env file

Create a file called `.env` in the project's root folder and add the following content:

```
# Database configuration
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=your_database_name

# Connection with PrismaORM
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public"

# JWT configuration
JWT_SECRET=
JWT_TOKEN_AUDIENCE=http://localhost:3000
JWT_TOKEN_ISSUER=http://localhost:3000
JWT_TTL="60d"
```

 **Important Note**: The JWT_SECRET should be a strong, secure value. You can generate one using an MD5 hash generator or another secure method. 

## 2. Initialize the Project

Run these commands in sequence:

```bash
# Generate Prisma Client based on your schema
npx prisma generate

# Start all Docker containers in detached mode
docker compose up -d

# Apply all pending database migrations
npx prisma migrate deploy
```

### After Initialization:
- The API will be available at: http://localhost:3000
- The PostgreSQL database will be available at: localhost:5432

## 3. Verifying the Installation

To verify that all services are running correctly, you can use:

#### For **production** environment
```docker compose -f docker-compose.prod.yml ps```

#### For **development** environment
```docker compose -f docker-compose.dev.yml ps```

All containers should have the status "Up".

## Api Endpoints

## User

- POST /auth/register 
- POST /auth/login 
- GET  /user/getById/:userId
- PUT  /user/updateProfile
- PUT  /user/updateCredentials

## Post

- GET /post/getAll 
- GET /post/getById/:postId
- GET /post/getAllByAuthor/:authorId 
- POST /post/create 
- PUT /post/update
- DELETE /post/delete/:postId

## Comment

- POST /comment/createComment
- POST /comment/createReply
- PUT /comment/updateComment
- GET /comment/getAllByPost/:postId
- DELETE /comment/delete/:commentId

## Like

- POST /like/like 
- POST /like/unlike 
- GET /like/getAllByPost/:postId

