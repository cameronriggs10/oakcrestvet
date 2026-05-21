# @oakcrest/integrations

Shared AI + third-party integration helpers for Oak Crest Veterinary Services.

## Includes

- AI chatbot service with FAQ matching + OpenAI fallback
- Weekly AI blog content generation
- Calendar adapters (Google, Outlook, Calendly)
- Notification channels (Resend email, Twilio SMS, Expo push)
- Intake form email formatter + sender
- Weekly content job helper for cron

## Example: Chat endpoint service

```ts
import { VetChatbotService, loadOpenAiEnv } from "@oakcrest/integrations";

const chatbot = new VetChatbotService(loadOpenAiEnv());

const response = await chatbot.reply({
  message: "My dog has been scratching all week. Should I come in?",
  clinicProfile: {
    name: "Oak Crest Veterinary Services",
    hours: "Mon-Fri 8am-6pm",
    phone: "(555) 000-0000",
    email: "care@oakcrestvet.com",
    bookingUrl: "https://oakcrestvet.com/book",
  },
  allowGeneralPetHealthAnswers: true,
  faqs: [],
  services: [],
});
```

## Example: calendar sync

```ts
import {
  CalendarSyncService,
  GoogleCalendarAdapter,
  OutlookCalendarAdapter,
} from "@oakcrest/integrations";

const sync = new CalendarSyncService();
sync.register(new GoogleCalendarAdapter({ accessToken, calendarId }));
sync.register(new OutlookCalendarAdapter({ accessToken: graphToken }));

await sync.create({
  provider: "GOOGLE",
  event: {
    title: "Oak Crest - Wellness Visit",
    startIso: "2026-06-01T15:00:00-04:00",
    endIso: "2026-06-01T15:30:00-04:00",
    attendeeEmail: "petparent@example.com",
  },
});
```
