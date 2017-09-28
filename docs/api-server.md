# API
This project includes an example API that can be split off into a standalone server. The goal of this API is to provide a set of commonly used endpoints that could apply to most modern web applications. This inclides things like:

- Site Settings
- Image Uploads
- Tokens (login/logout)

# Stack
- [routing-controllers](https://github.com/pleerock/routing-controllers) Create structured, declarative and beautifully organized class-based controllers with heavy decorators usage in Express / Koa using TypeScript and Routing Controllers Framework.
- [swagger-jsdoc]() Generates swagger doc based on JSDoc.
- [swagger-ui-express]() Adds middleware to your express app to serve the Swagger UI bound to your Swagger document. This acts as living documentation for your API hosted from within your app.
- [typedi]() Dependency Injection for TypeScript.

# Structure
The API has an opinionted structure in order to better sperate the various layers of the applications:

- Controllers: gateway to the outside world, where users actually interact with the server
- Services: internal tools that can be used in controllers, other services, or anywhere in the API
- Repositories: data stores that are normally accessed via services
- Middlewares: express server plugins

## Removing from the project
... TODO