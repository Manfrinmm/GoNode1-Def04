"use strict";

const Mail = use("Mail");

class ShareEvento {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return "ShareEvento-job";
  }

  // This is where the work is done.
  async handle({ title, where, when, user, email }) {
    console.log({ title, where, when, user, email });
    await Mail.send(
      ["emails.emailNotificationEvent", "emails.emailNotificationEvent-text"],
      { title, where, when },
      message => {
        message
          .from(user.email)
          .to(email)
          .subject("Informações de evento");
      }
    );
  }
}

module.exports = ShareEvento;
