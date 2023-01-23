# API Developer Practical Exercise

## Requirements
You are developing a software to account for maintenance tasks performed during a
working day. This application has two types of users (Manager, Technician).
The technician performs tasks and is only able to see, create or update his own
performed tasks.
The manager can see tasks from all the technicians, delete them, and should be
notified when some tech performs a task.
A task has a summary (max: 2500 characters) and a date when it was performed, the
summary from the task can contain personal information.

## Notes:
• If you don’t have enough time to complete the test you should prioritize
complete features (with tests) over many features;
• We’ll evaluate security, quality and readability of your code;
• This test is suitable for all levels of developers, so make sure to prove yours.

## Development
### Features:
• Create API endpoint to save a new task;
• Create API endpoint to list tasks;
• Notify manager of each task performed by the tech (This notification can be
just a print saying “The tech X performed the task Y on date Z”);
• This notification should not block any http request.

### Tech Requirements:
• Use either Go or Node to develop this HTTP API;
• Create a local development environment using docker containing this service
and a MySQL database;
• Use MySQL database to persist data from the application;
• Features should have unit tests to ensure they are working properly

### Bonus
• Use a message broker to decouple notification logic from the application flow;
• Create Kubernetes object files needed to deploy this application.


# How to
## Containers
Run ``docker-compose up -d`` to create and up all containers, network and volumes.
Server container is going to be expose on ``localhost:3000``.

## Database
Run migrations to create tables wiht ``npx sequelize-cli db:migrate``.

## Initial data
The project prove initial data for jest tests and code evaluation. Use ``npx sequelize-cli db:seed:all``.

## Tests
Use ``npm test`` to run all unit tests.

# Notes

## Wrong contract notations
When I set some contract class doc, I know they are not abstracts or interface.
However, these doc have the purpose to indicate their functionality in the architecture.
In Typescript these types are available, in case of a migration.

## User token
The user token as a column in users table is not the best way to control it. The point here is provide a minimal structure to handle user from request and make tests easier. The next step and right way is implement it with JWT package using different tables.