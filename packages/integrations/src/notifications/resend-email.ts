import { fetchJson } from "../utils/http";
import type { EmailChannel, EmailMessage } from "./types";

export interface ResendEmailChannelConfig {
  apiKey: string;
  fromEmail: string;
}

export class ResendEmailChannel implements EmailChannel {
  private readonly apiKey: string;
  private readonly fromEmail: string;

  constructor(config: ResendEmailChannelConfig) {
    this.apiKey = config.apiKey;
    this.fromEmail = config.fromEmail;
  }

  async send(message: EmailMessage): Promise<void> {
    await fetchJson(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          from: this.fromEmail,
          to: message.to,
          subject: message.subject,
          text: message.text,
          html: message.html,
        }),
      },
      "Resend email failed",
    );
  }
}
