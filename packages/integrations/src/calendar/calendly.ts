import type { CalendarEventInput, CalendarEventResult } from "../types";
import { fetchJson } from "../utils/http";
import type { CalendarAdapter } from "./types";

interface CalendlySchedulingLinkResponse {
  resource: {
    booking_url: string;
    owner: string;
  };
}

export interface CalendlyAdapterConfig {
  personalAccessToken: string;
  eventTypeUri: string;
  organizationUri?: string;
}

export class CalendlyAdapter implements CalendarAdapter {
  readonly provider = "CALENDLY" as const;

  private readonly token: string;
  private readonly eventTypeUri: string;
  private readonly organizationUri?: string;

  constructor(config: CalendlyAdapterConfig) {
    this.token = config.personalAccessToken;
    this.eventTypeUri = config.eventTypeUri;
    this.organizationUri = config.organizationUri;
  }

  async createEvent(event: CalendarEventInput): Promise<CalendarEventResult> {
    const payload = await fetchJson<CalendlySchedulingLinkResponse>(
      "https://api.calendly.com/scheduling_links",
      {
        method: "POST",
        headers: this.headers(),
        body: JSON.stringify({
          owner: this.eventTypeUri,
          owner_type: "EventType",
          max_event_count: 1,
          invitee: {
            email: event.attendeeEmail,
            name: event.attendeeName,
          },
        }),
      },
      "Calendly scheduling link create failed",
    );

    return {
      provider: this.provider,
      externalEventId: payload.resource.owner,
      htmlLink: payload.resource.booking_url,
      raw: payload,
    };
  }

  async updateEvent(_externalEventId: string, _event: CalendarEventInput): Promise<CalendarEventResult> {
    throw new Error(
      "Calendly events are generally rescheduled/canceled via booking links or Calendly invitee APIs. Use stored booking URL.",
    );
  }

  async cancelEvent(_externalEventId: string): Promise<void> {
    throw new Error(
      "Calendly cancellation must be completed through Calendly invitee/cancellation endpoints based on event URI.",
    );
  }

  async listScheduledEvents() {
    if (!this.organizationUri) {
      return [];
    }

    const payload = await fetchJson<{ collection: unknown[] }>(
      `https://api.calendly.com/scheduled_events?organization=${encodeURIComponent(this.organizationUri)}`,
      {
        headers: this.headers(),
      },
      "Calendly list events failed",
    );

    return payload.collection;
  }

  private headers() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }
}
