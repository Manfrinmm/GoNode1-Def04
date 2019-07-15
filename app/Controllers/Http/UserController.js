"use strict";
const Hash = use("Hash");
const User = use("App/Models/User");

class UserController {
  async store({ request }) {
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);

    return user;
  }

  async update({ request, auth, response }) {
    const { username, old_password, password } = request.all();

    //pegar o usuario pelo token
    const token = await auth.getUser();

    const user = await User.find(token.id);

    if (username) {
      const userExist = await User.findBy("username", username);
      if (userExist)
        return response.status(400).json({ message: "username já usado" });
      user.username = username;
    }

    if (old_password) {
      const verify = await Hash.verify(old_password, user.password);
      if (!verify)
        return response
          .status(401)
          .json({ message: "Senha não bate com a antiga" });
      user.password = password;
    }

    await user.save();
    return user;
  }
}

module.exports = UserController;
