### Installation

WorkOrders was built and run on [Node.js](https://nodejs.org/) v10.
Requires MongoDB to be installed and mongod configured in your PATH variable.

To install requirements and run:
```sh
Windows:
npm run install-run-win
OSX:
npm run install-run-mac
```

To just run MongoDB and Node:
```sh
Windows:
npm run start-mongo-win
OSX:
npm run start-mongo-mac
```

To just run the server:
```sh
npm run start
```

### Description
WorkOrders is a simple application to keep track of workers and their work orders. With this, you can create and delete workers, create work orders, and assign workers to work orders. You're also able to keep track of who is assigned to which work orders.

### Endpoints

[Live Demo](https://workorderbackend.herokuapp.com)

##### Workers
| HTTP Method | Endpoint | Fields | Description |
| ----------- | -------- | ------ | ----------- |
| POST | /api/worker | { name: string, email: string, companyName: string } | Requires all 3 fields to be filled in, creates a new worker, email is unique |
| GET | /api/worker | N/A | Gets all workers |
| DELETE | /api/worker/:worker | N/A | Deletes a worker where :worker is the ID of the worker |

##### WorkOrders
| HTTP Method | Endpoint | Fields | Description |
| ----------- | -------- | ------ | ----------- |
| POST | /api/workorder | { title: string, description: string, deadline: Date, workers?: Worker[] } | Requires title, description, and deadline to be supplied, creates a new Work Order |
| GET | /api/workorder | N/A | Returns all work orders sorted by date in ascending order |
| PATCH | /api/:workorder/:worker | N/A | Adds a worker to a work order where :workorder is the work order to be added to and :worker is the worker being added |
| GET | /api/workorder/worker/:worker | N/A | Get's all work orders that a worker belongs to |