"use strict";

const kue = use("Kue");
const Job = use("App/Jobs/ShareEvento");

const Evento = use("App/Models/Evento");

class ShareEventController {
  async store({ request, response, params, auth }) {
    const email = request.input("email");

    const evento = await Evento.find(params.id);

    //Carregar o usuario desse evento
    const user = await evento.user().fetch();

    const { title, where, when } = evento;

    kue.dispatch(Job.key, { title, where, when, user, email });

    return response.status(200).json({ message: "Enviado" });
  }
}

module.exports = ShareEventController;
