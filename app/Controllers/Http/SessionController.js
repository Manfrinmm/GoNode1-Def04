"use strict";
const User = use("App/Models/User");

class SessionController {
  //Validar quando a senha não bate
  async store({ request, response, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    return token;
  }
}

module.exports = SessionController;
