# ImageAI - fullstack

This is a website, with a simple skeleton for Registering, Signing up and Recognising faces using [Clarifai Face Detection](https://clarifai.com/clarifai/main/models/face-detection) API

## Getting Started

All the packages are installed but you are requested to make certain changes in the server.js file.

### Prerequisites

List any software or tools that need to be installed before setting up the project. For example:

- Node.js 
- npm

### Installation

1. Clone the repository
2. Make the following changes to the server.js file in imageai-api
    ```shell
    const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1'<assuming localhost>,
      port : 5432<your port, 5432 is default>,
      user : <your username>,
      password : <your- password>,
      database : <name-of-your-database>
    }
  });
3. ```shell
    cd directory-of-the-app
    npm start
4. Make sure you have npm installed before following up point no.2
5. Server runs on `port 3000` by default. You can run the frontend on `port 3001` and database on `port 5432` for smooth operation!
