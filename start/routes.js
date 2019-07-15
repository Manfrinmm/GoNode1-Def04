"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use("Route");

Route.post("user", "UserController.store").validator("User");
Route.post("session", "SessionController.store");

//Validar rota de uptade
Route.put("user", "UserController.update");

Route.resource("evento", "EventoController")
  .apiOnly()
  .validator(
    new Map([
      [["evento.store"], ["EventoStore"]],
      [["evento.update"], ["EventoUpdate"]]
    ])
  );

Route.post("shareEvent/:id", "ShareEventController.store").validator(
  "ShareEvent"
);
