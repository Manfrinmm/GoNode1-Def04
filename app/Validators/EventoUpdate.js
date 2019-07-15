"use strict";

class EventoUpdate {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      // validation rules

      when: "date"
    };
  }
}

module.exports = EventoUpdate;
