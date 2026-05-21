import type { CalendarEventInput, CalendarEventResult, CalendarProvider } from "../types";

export interface CalendarAdapter {
  provider: CalendarProvider;
  createEvent(event: CalendarEventInput): Promise<CalendarEventResult>;
  updateEvent(externalEventId: string, event: CalendarEventInput): Promise<CalendarEventResult>;
  cancelEvent(externalEventId: string): Promise<void>;
}

export interface CalendarSyncRequest {
  provider: CalendarProvider;
  event: CalendarEventInput;
}
