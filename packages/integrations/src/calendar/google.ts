import type { CalendarEventInput, CalendarEventResult } from "../types";
import { fetchJson } from "../utils/http";
import type { CalendarAdapter } from "./types";

interface GoogleEventPayload {
  id: string;
  htmlLink?: string;
}

export interface GoogleCalendarAdapterConfig {
  accessToken: string;
  calendarId: string;
  timezone?: string;
}

export class GoogleCalendarAdapter implements CalendarAdapter {
  readonly provider = "GOOGLE" as const;

  private readonly accessToken: string;
  private readonly calendarId: string;
  private readonly timezone?: string;

  constructor(config: GoogleCalendarAdapterConfig) {
    this.accessToken = config.accessToken;
    this.calendarId = encodeURIComponent(config.calendarId);
    this.timezone = config.timezone;
  }

  async createEvent(event: CalendarEventInput): Promise<CalendarEventResult> {
    const payload = await fetchJson<GoogleEventPayload>(
      `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events`,
      {
        method: "POST",
        headers: this.headers(),
        body: JSON.stringify(this.toGoogleBody(event)),
      },
      "Google calendar create failed",
    );

    return {
      provider: this.provider,
      externalEventId: payload.id,
      htmlLink: payload.htmlLink,
      raw: payload,
    };
  }

  async updateEvent(externalEventId: string, event: CalendarEventInput): Promise<CalendarEventResult> {
    const payload = await fetchJson<GoogleEventPayload>(
      `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events/${externalEventId}`,
      {
        method: "PATCH",
        headers: this.headers(),
        body: JSON.stringify(this.toGoogleBody(event)),
      },
      "Google calendar update failed",
    );

    return {
      provider: this.provider,
      externalEventId: payload.id,
      htmlLink: payload.htmlLink,
      raw: payload,
    };
  }

  async cancelEvent(externalEventId: string): Promise<void> {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events/${externalEventId}`,
      {
        method: "DELETE",
        headers: this.headers(),
      },
    );

    if (!response.ok && response.status !== 410 && response.status !== 404) {
      throw new Error(`Google calendar cancel failed: ${response.status}`);
    }
  }

  private toGoogleBody(event: CalendarEventInput) {
    return {
      summary: event.title,
      description: event.description,
      location: event.location,
      start: {
        dateTime: event.startIso,
        timeZone: event.timezone ?? this.timezone,
      },
      end: {
        dateTime: event.endIso,
        timeZone: event.timezone ?? this.timezone,
      },
      attendees: event.attendeeEmail
        ? [
            {
              email: event.attendeeEmail,
              displayName: event.attendeeName,
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
