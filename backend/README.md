# MOVIES API 

  

Create update delete and list movies.

  

# Table of Contents

[Pre-requisites](#Pre-requisites)

  

[Getting started](#Getting-started)

  

[API Document endpoints](#API-endpoints)
  

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version >= 14.10.0
- MySql database managed storage service


# Getting-started

#### Clone the repository

```

git clone <git lab url> /<project-name>.git

```

#### Install dependencies

```

cd <project-name>

npm install

```


#### Configure .env file (rename .env.example to .env)


#### Build and run the project

```

npm start

```

- run sequelize seed command

```

npm run seed

```

- Navigate to `http://localhost:5000`


  

# API-endpoints

```

swagger Endpoint : http://localhost:5000/api-docs

username: admin@mailinator.com

password: Test@123

```

- Any column add or update case Run command

```

npm run migration

```

# Development SDK/Services Versions

- Node: 16.13.0 LTS
- MySql: 8.0.31/8.0.34
- Sequelize: 6.24.0
