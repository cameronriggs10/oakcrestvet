import type { AppointmentReminderInput } from "../types";

export interface EmailMessage {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export interface SmsMessage {
  to: string;
  body: string;
}

export interface PushMessage {
  to: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

export interface EmailChannel {
  send(message: EmailMessage): Promise<void>;
}

export interface SmsChannel {
  send(message: SmsMessage): Promise<void>;
}

export interface PushChannel {
  send(message: PushMessage): Promise<void>;
}

export interface NotificationChannels {
  email?: EmailChannel;
  sms?: SmsChannel;
  push?: PushChannel;
}

export interface AlertCampaignInput {
  subject: string;
  message: string;
  audience: {
    emails?: string[];
    phones?: string[];
    pushTokens?: string[];
  };
}

export interface ReminderOptions {
  includeEmail?: boolean;
  includeSms?: boolean;
  includePush?: boolean;
  bookingUrl?: string;
}

export interface ReminderService {
  sendAppointmentReminder(input: AppointmentReminderInput, options?: ReminderOptions): Promise<void>;
}
