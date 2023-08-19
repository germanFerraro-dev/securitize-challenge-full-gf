# Securitize fullstack challenge

## Table of Contents

- [Overview](#overview)
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [API endpoints documentation](#api-endpoints-documentation)

## Overview

The application consists of a backend and frontend folder structure, all running in a docker container that holds the React, NestJS and Postgres db ecosystem. According to the challenge app must be ready for production, so it starts dockerized in prod mode in both React and Nest apps.

### Backend

Built with NestJS + Postgres for database. Im handling migrations and communications to the database with TypeOrm. Since its schema wont be changing, migration is run only the first time the docker container starts.

The wallets saved are stored in the database, and the user is able to mark/unmark as favorites, and delete them. Information regarding balance and age of the wallet is being called directly from the etherscan API, with endpoints available in the app. Same goes with rates, but in this case the data is fetched from coingecko API.

Swagger is implemented for clean API status responses and access to visual API docs.

### Frontend

Built with Vite + TS, redux-toolkit for managing states and queries to the backend, and Material UI + TailwindCSS for styling and components. The idea behind this style stack is to build and style components quickly, while still being customizable.

All the API calls to the Nest endpoints are in the data folder, which contains the redux query functionality, and the state management (store and slices) lies in the store folder.

When needed, the components follow a structure of screen + presenter pattern, meaning that all the logic is managed by the hook with its same name, e.g `walletForm` relies on `useWalletForm`.

## Features

All the features of the application fulfill the requirements from the assignment:

- Add addresses and display them.
- Select favorites + sort list by them.
- Alert for old wallets (within the element)
- Get exchange rates from euro and US dollar to ETH (coinGecko API). The user is able to edi the rates.
- Balance display of the wallet according selected rate.

## Installation

1. Pull the Docker image and boot the container:

    - `docker compose up -d`

2. Local url for frontend application: `http://localhost:5173/`

3. Local url for backend API endpoint: `http://localhost:4000/`

## Swagger 

You can access Swagger docs in `http://localhost:4000/api/docs`

## API Endpoints Documentation

## GET Wallets
- **Endpoint**: `http://localhost:4000/wallet/getwallets`
- **Description**: Get a list of wallets.

### Query Params
- None

---

## GET Wallets (Sort by Favorite)
- **Endpoint**: `http://localhost:4000/wallet/getwallets?orderBy=favorite`
- **Description**: Get a list of wallets sorted by favorite status.

### Query Params
- `orderBy`: `favorite`

---

## GET Wallet Balance
- **Endpoint**: `http://localhost:4000/wallet/getwalletbalance/0x71C7656EC7ab88b098defB751B7401B5f6d8976F`
- **Description**: Get the balance of a specific wallet.

---

## GET Is Wallet Old
- **Endpoint**: `http://localhost:4000/wallet/iswalletold/0xdB055877e6c13b6A6B25aBcAA29B393777dD0a73`
- **Description**: Check if a wallet is old.

---

## POST Add Wallet
- **Endpoint**: `http://localhost:4000/wallet/addwallet/`
- **Description**: Add a new wallet.

### Body
- Raw (JSON)
```json
{
    "walletAddress": "0xddbd2b932c763ba5b1b7ae3b362eacds3e8d40121a"
}
```

## POST Delete Wallet
- **Endpoint**: `http://localhost:4000/wallet/deletewallet/`
- **Description**: Delete wallet.

### Body
- Raw (JSON)
```json
{
    "walletAddress": "0xddbd2b932c763ba5b1b7ae3b362eacds3e8d40121a"
}
```

## PUT Mark as favorite
- **Endpoint**: `http://localhost:4000/wallet/markasfavorite/`
- **Description**: Mark wallet as favorite.

### Body
- Raw (JSON)
```json
{
    "walletAddress": "0xddbd2b932c763ba5b1b7ae3b362eacds3e8d40121a"
}
```

## PUT Remove From Favorites
- **Endpoint**: `http://localhost:4000/wallet/markasfavorite/`
- **Description**: Remove wallet from favorites.

### Body
- Raw (JSON)
```json
{
    "walletAddress": "0xddbd2b932c763ba5b1b7ae3b362eacds3e8d40121a"
}
```

## GET Get exchangeRates
- **Endpoint**: `http://localhost:4000/rates/getexchangerates`
- **Description**: Get an array of exchange rates, containing USD and EUR to ETH rate information.

### Query Params
- None

---

