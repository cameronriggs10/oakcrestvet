import type { CalendarEventInput, CalendarEventResult } from "../types";
import { fetchJson } from "../utils/http";
import type { CalendarAdapter } from "./types";

interface OutlookEventPayload {
  id: string;
  webLink?: string;
}

export interface OutlookCalendarAdapterConfig {
  accessToken: string;
  calendarOwner?: string;
  timezone?: string;
}

export class OutlookCalendarAdapter implements CalendarAdapter {
  readonly provider = "OUTLOOK" as const;

  private readonly accessToken: string;
  private readonly timezone?: string;
  private readonly baseUrl: string;

  constructor(config: OutlookCalendarAdapterConfig) {
    this.accessToken = config.accessToken;
    this.timezone = config.timezone;
    this.baseUrl = config.calendarOwner
      ? `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(config.calendarOwner)}/events`
      : "https://graph.microsoft.com/v1.0/me/events";
  }

  async createEvent(event: CalendarEventInput): Promise<CalendarEventResult> {
    const payload = await fetchJson<OutlookEventPayload>(
      this.baseUrl,
      {
        method: "POST",
        headers: this.headers(),
        body: JSON.stringify(this.toOutlookBody(event)),
      },
      "Outlook create event failed",
    );

    return {
      provider: this.provider,
      externalEventId: payload.id,
      htmlLink: payload.webLink,
      raw: payload,
    };
  }

  async updateEvent(externalEventId: string, event: CalendarEventInput): Promise<CalendarEventResult> {
    const payload = await fetchJson<OutlookEventPayload>(
      `${this.baseUrl}/${encodeURIComponent(externalEventId)}`,
      {
        method: "PATCH",
        headers: this.headers(),
        body: JSON.stringify(this.toOutlookBody(event)),
      },
      "Outlook update event failed",
    );

    return {
      provider: this.provider,
      externalEventId: payload.id,
      htmlLink: payload.webLink,
      raw: payload,
    };
  }

  async cancelEvent(externalEventId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${encodeURIComponent(externalEventId)}`, {
      method: "DELETE",
      headers: this.headers(),
    });

    if (!response.ok && response.status !== 404) {
      throw new Error(`Outlook cancel event failed: ${response.status}`);
    }
  }

  private toOutlookBody(event: CalendarEventInput) {
    return {
      subject: event.title,
      body: {
        contentType: "Text",
        content: event.description ?? "",
      },
      start: {
        dateTime: event.startIso,
        timeZone: event.timezone ?? this.timezone ?? "UTC",
      },
      end: {
        dateTime: event.endIso,
        timeZone: event.timezone ?? this.timezone ?? "UTC",
      },
      location: event.location
        ? {
            displayName: event.location,
          }
        : undefined,
      attendees: event.attendeeEmail
        ? [
            {
              emailAddress: {
                address: event.attendeeEmail,
                name: event.attendeeName,
              },
              type: "required",
            },
          ]
        : [],
    };
  }

  private headers() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
    };
  }
}
