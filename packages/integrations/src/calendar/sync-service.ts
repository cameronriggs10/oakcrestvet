import type { CalendarEventResult, CalendarProvider } from "../types";
import type { CalendarAdapter, CalendarSyncRequest } from "./types";

export class CalendarSyncService {
  private readonly adapters = new Map<CalendarProvider, CalendarAdapter>();

  register(adapter: CalendarAdapter) {
    this.adapters.set(adapter.provider, adapter);
  }

  async create(syncRequest: CalendarSyncRequest): Promise<CalendarEventResult> {
    const adapter = this.adapters.get(syncRequest.provider);
    if (!adapter) {
      throw new Error(`Calendar provider not configured: ${syncRequest.provider}`);
    }

    return adapter.createEvent(syncRequest.event);
  }

  async update(
    provider: CalendarProvider,
    externalEventId: string,
    event: CalendarSyncRequest["event"],
  ): Promise<CalendarEventResult> {
    const adapter = this.adapters.get(provider);
    if (!adapter) {
      throw new Error(`Calendar provider not configured: ${provider}`);
    }

    return adapter.updateEvent(externalEventId, event);
  }

  async cancel(provider: CalendarProvider, externalEventId: string): Promise<void> {
    const adapter = this.adapters.get(provider);
    if (!adapter) {
      throw new Error(`Calendar provider not configured: ${provider}`);
    }

    return adapter.cancelEvent(externalEventId);
  }
}
