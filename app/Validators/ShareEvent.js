"use strict";

class ShareEvent {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      // validation rules
      email: "required|email"
    };
  }
}

module.exports = ShareEvent;
