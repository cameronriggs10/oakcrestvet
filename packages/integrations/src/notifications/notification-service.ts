import type { AppointmentReminderInput } from "../types";
import type {
  AlertCampaignInput,
  NotificationChannels,
  ReminderOptions,
  ReminderService,
} from "./types";

export class NotificationService implements ReminderService {
  constructor(private readonly channels: NotificationChannels) {}

  async sendAlertCampaign(input: AlertCampaignInput): Promise<void> {
    const jobs: Promise<void>[] = [];

    if (this.channels.email && input.audience.emails?.length) {
      for (const email of input.audience.emails) {
        jobs.push(
          this.channels.email.send({
            to: email,
            subject: input.subject,
            text: input.message,
          }),
        );
      }
    }

    if (this.channels.sms && input.audience.phones?.length) {
      for (const phone of input.audience.phones) {
        jobs.push(
          this.channels.sms.send({
            to: phone,
            body: `${input.subject}: ${input.message}`,
          }),
        );
      }
    }

    if (this.channels.push && input.audience.pushTokens?.length) {
      for (const token of input.audience.pushTokens) {
        jobs.push(
          this.channels.push.send({
            to: token,
            title: input.subject,
            body: input.message,
          }),
        );
      }
    }

    await Promise.all(jobs);
  }

  async sendAppointmentReminder(
    input: AppointmentReminderInput,
    options: ReminderOptions = {},
  ): Promise<void> {
    const includeEmail = options.includeEmail ?? true;
    const includeSms = options.includeSms ?? true;
    const includePush = options.includePush ?? true;

    const message = [
      `Hi ${input.clientName}, this is a reminder for ${input.petName}.`,
      `${input.serviceName} is scheduled at ${new Date(input.appointmentIso).toLocaleString()}.`,
      options.bookingUrl ? `Need to reschedule? ${options.bookingUrl}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    const jobs: Promise<void>[] = [];

    if (includeEmail && this.channels.email && input.destinationEmail) {
      jobs.push(
        this.channels.email.send({
          to: input.destinationEmail,
          subject: "Oak Crest Vet Appointment Reminder",
          text: message,
        }),
      );
    }

    if (includeSms && this.channels.sms && input.destinationPhone) {
      jobs.push(
        this.channels.sms.send({
          to: input.destinationPhone,
          body: message,
        }),
      );
    }

    if (includePush && this.channels.push && input.pushToken) {
      jobs.push(
        this.channels.push.send({
          to: input.pushToken,
          title: "Appointment Reminder",
          body: message,
          data: {
            appointmentIso: input.appointmentIso,
          },
        }),
      );
    }

    await Promise.all(jobs);
  }
}
