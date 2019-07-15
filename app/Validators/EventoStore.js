"use strict";

class EventoStore {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      // validation rules
      title: "required",
      where: "required",
      when: "date"
    };
  }
}

module.exports = EventoStore;
