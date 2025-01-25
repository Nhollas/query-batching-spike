# query-batching-spike

## Overview

This repository is a spike project to explore and implement query batching strategies using React Query. The main focus is on batching queries by byte size either in parallel or sequentially to optimise network requests and improve performance.

The project includes custom hooks for handling batched queries and utilities for managing query batching logic.

Example use case:

- The API we call has a payload limit of 100kb per request so we want to batch requests to ensure we don't exceed this limit.

## Setting Up The Project

#### Prerequisites

- Node.js
- npm

You can check your Node.js and npm versions by running:

```bash
node --version
npm --version
```

#### 1. Install Dependencies (if not done already through CLI):

```bash
npm install
```

#### 2. Run Development Server

Finally, run the development server:

```bash
npm run dev
```

Now you can open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
