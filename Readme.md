# Node Typescript Drug Service

This is a server node with typescript for the capstone medicify project, this service is used to retrieve drug data in the database

## First Configuration

Make sure you have the following software installed locally before running this project:

- Node.js (version 12 or higher)
- npm (Node Package Manager)
- Use yarn instead npm for package manager
- Docker (optional, required if you want to use a Docker database)

```bash
  git clone https://github.com/Medicify/drug-service.git
  yarn install
```

## Prisma

note:

- import sql table from https://github.com/Medicify/scraping-service/blob/master/drug_capstone.sql
- before you run development or production runtime, make sure prisma has been generated

```bash
  yarn prisma db pull
  yarn prisma generate
```

## Development Mode

```bash
  yarn run dev
```

the browser will serve localhost:5000

## Testing Mode

```bash
  yarn test
```

mocha configure test folder as testing files input

## Production Mode

```bash
  yarn run build
```

typescript will compile into javascript file

## Starting Production

```bash
  yarn start
```

node will be serve build folder, before use it, don't forget to compile src folder with syntax yarn run build

## API Reference

#### Base URL

```http
  http://localhost:5000/api/drugs
```

## GET all drugs

Retrieve all drug data

```http
  GET /api/drugs
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `drugs`   | `string` | **Required**. |

Example Response

```http
 "service": "drug service",
  "status": "success",200 ok
  "message": "get all drug",
  "request": null,
  "response": {
    "total": 883,
    "data": [ example data
       ]
  }
```

## GET drugs by name

Displays drug data by name

```http
  GET /api/drugs?title={{drugName}}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `title`   | `string` | **Required**. title of item to fetch |

Example Response

```http
{
  "service": "drug service",
  "status": "success",
  "message": "get drug by title paracetamol",
  "request": {
    "title": "paracetamol"
  },
  "response": {
    "total": 2,
    "data": [ example data
       ] }
  }

```

## GET drugs by categori

Displays drug data by category

```http
  GET /api/drugs?category={{category}}
```

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `category` | `string` | **Required**. category of item to fetch |

Example Response

```http
{
  "service": "drug service",
  "status": "success",
  "message": "get drug by category kaplet",
  "request": {
    "category": "kaplet"
  },
  "response": {
    "total": 34,
    "data": [example data ]
     }}
```

## GET drugs by categori & title

Displays drug data by category and title

```http
  GET /api/drugs?category={{category}}&title={{drugName}}
```

| Parameter         | Type     | Description                                       |
| :---------------- | :------- | :------------------------------------------------ |
| `category, title` | `string` | **Required**. category and title of item to fetch |

Example Response

```http
{
  "service": "drug service",
  "status": "success",
  "message": "get drug by category kaplet and title paracetamol",
  "request": {
    "category": "kaplet",
    "title": "paracetamol"
  },
  "response": {
    "total": 2,
    "data": [ example data] }}
```

## GET drugs by id

Displays drug data by id

```http
  GET /api/drugs/{{drugID}}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of item to fetch |

Example Response

```http
{
  "service": "drug service",
  "status": "success",
  "message": "get drug id 50112435-fad0-11ed-80ab-1063c8cf",
  "request": {
    "id": "50112435-fad0-11ed-80ab-1063c8cf"
  },
  "response": {
    "total": 1,
    "data": {[ example data] }}}
```

## GET drugs page & tage (pagination)

Displays drug data per page each page contains 10 data

```http
  GET /api/drugs?page={{page}}&take={{take}}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `page`    | `string` | **Required**. page of item to fetch |
| `take`    | `string` | **Required**. take of item to fetch |

Example Response

```http
{
  "service": "drug service",
  "status": "success",
  "message": "get all drug on page 1 content 10",
  "request": {
    "page": "1",
    "take": "10"
  },
  "response": {
    "total": 10,
    "page": {
      "current": 1,
      "next": 2,
      "prev": null
    },
    "data": [ example data] }}
```

## GET drugs only page

Displays drug data per page

```http
  GET /api/drugs?page={{page}}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `page`    | `string` | **Required**. page of item to fetch |

Example Response

```http
{
  "service": "drug service",
  "status": "success",
  "message": "get all drug on page 1 content 10",
  "request": {
    "page": "1"
  },
  "response": {
    "total": 10,
    "page": {
      "current": 1,
      "next": 2,
      "prev": null
    },
    "data": [ example data] }}
```

## GET drugs only take

Display drug data only a certain amount

```http
  GET /api/drugs?take={{only_take}}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `take`    | `string` | **Required**. take of item to fetch |

Example Response

```http
{
  "service": "drug service",
  "status": "success",
  "message": "get all drug on page 1 content 100",
  "request": {
    "take": "100"
  },
  "response": {
    "total": 100,
    "page": {
      "current": 1,
      "next": 2,
      "prev": null
    },
    "data": [ example data] }}
```

## Documentation

[Documentation](https://nodejs.org/en/docs)

## Cloud Computing Team C23-PS135

Bangkit Academy 2023 batch 1
