import type { SmsChannel, SmsMessage } from "./types";

export interface TwilioSmsChannelConfig {
  accountSid: string;
  authToken: string;
  fromNumber: string;
}

export class TwilioSmsChannel implements SmsChannel {
  private readonly accountSid: string;
  private readonly authToken: string;
  private readonly fromNumber: string;

  constructor(config: TwilioSmsChannelConfig) {
    this.accountSid = config.accountSid;
    this.authToken = config.authToken;
    this.fromNumber = config.fromNumber;
  }

  async send(message: SmsMessage): Promise<void> {
    const body = new URLSearchParams({
      To: message.to,
      From: this.fromNumber,
      Body: message.body,
    });

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${this.accountSid}:${this.authToken}`).toString("base64")}`,
        },
        body: body.toString(),
      },
    );

    if (!response.ok) {
      const payload = await response.text();
      throw new Error(`Twilio SMS failed: ${response.status} ${payload}`);
    }
  }
}
