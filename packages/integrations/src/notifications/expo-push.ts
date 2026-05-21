import { fetchJson } from "../utils/http";
import type { PushChannel, PushMessage } from "./types";

export class ExpoPushChannel implements PushChannel {
  async send(message: PushMessage): Promise<void> {
    await fetchJson(
      "https://exp.host/--/api/v2/push/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: message.to,
          title: message.title,
          body: message.body,
          data: message.data,
          sound: "default",
        }),
      },
      "Expo push notification failed",
    );
  }
}
