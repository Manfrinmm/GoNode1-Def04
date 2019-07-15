"use strict";

const Evento = use("App/Models/Evento");
const moment = require("moment");

class EventoController {
  async index({ auth }) {
    const user = await auth.getUser();

    //Falta filtrar por data de criação
    const eventos = await Evento.query()
      .where({ user_id: user.id })
      //.with("user")
      .fetch();

    return eventos;
  }

  async store({ request, auth, response }) {
    const data = request.all();
    const user = await auth.getUser();

    try {
      await Evento.findByOrFail({
        when: data.when,
        user_id: user.id
      });

      return response.status(400).json({ message: "Conflito de horario" });
    } catch {
      const evento = await Evento.create({ ...data, user_id: user.id });

      return evento;
    }
  }

  async show({ response, auth, params }) {
    const user = await auth.getUser();

    try {
      const evento = await Evento.findOrFail(params.id);

      if (evento.user_id !== user.id)
        return response
          .status(401)
          .json({ message: "Esse evento não percente a você" });

      return evento;
    } catch (err) {
      return response
        .status(err.status)
        .json({ message: "Evento não encontrado" });
    }
  }

  async update({ params, request, response, auth }) {
    const data = request.all();

    const user = await auth.getUser();

    try {
      const evento = await Evento.findOrFail(params.id);

      if (evento.user_id !== user.id)
        return response
          .status(401)
          .json({ message: "Esse evento não percente a você" });

      if (moment(new Date()).isAfter(evento.when))
        return response.status(401).json({ message: "Esse evento já passou" });

      evento.merge(data);

      await evento.save();

      return evento;
    } catch (err) {
      return response
        .status(err.status)
        .json({ message: "Evento não encontrado" });
    }
  }

  async destroy({ params, response, auth }) {
    const user = await auth.getUser();

    try {
      const evento = await Evento.findOrFail(params.id);

      if (evento.user_id !== user.id)
        return response
          .status(401)
          .json({ message: "Esse evento não percente a você" });

      if (moment(new Date()).isAfter(evento.when))
        return response.status(401).json({ message: "Esse evento já passou" });

      await evento.delete();

      return response.status(200).json({ message: "Deletado" });
    } catch (err) {
      return response
        .status(err.status)
        .json({ message: "Evento não encontrado" });
    }
  }
}

module.exports = EventoController;
