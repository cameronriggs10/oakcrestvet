# AI & Integrations Handoff (Backend + Frontend + Mobile)

This document explains how to wire the new `@oakcrest/integrations` package into the app/API.

## Added package

- `packages/integrations`
  - AI chatbot (`VetChatbotService`)
  - AI weekly content generator (`WeeklyContentGenerator`, `runWeeklyBlogJob`)
  - Calendar adapters (`GoogleCalendarAdapter`, `OutlookCalendarAdapter`, `CalendlyAdapter`)
  - Notification service (`NotificationService` + Resend/Twilio/Expo channels)
  - Intake submission email formatter + sender

## Recommended API wiring

### 1) `POST /api/chat`

Use `VetChatbotService.reply()` with:
- `message` from request body
- `history` from local chat state
- `faqs` from DB
- `services` from DB
- `clinicProfile` from config table / env

Return:
- `reply` (assistant response)
- `shouldOfferBooking` (frontend can show quick action)
- `escalation` (`none | clinic | emergency`)

### 2) `POST /api/appointments/book`

After appointment DB insert, call `CalendarSyncService.create({ provider, event })`.
Store:
- `externalEventId`
- `provider`
- optional `htmlLink` for Calendly booking URLs

On update/cancel route handlers:
- call `CalendarSyncService.update(...)` or `.cancel(...)`.

### 3) `POST /api/content/generate`

Use `runWeeklyBlogJob`.
- Source topic from `topicOverride` or AI trend suggestions
- Persist output in `BlogPost` table as draft (`isAiGenerated = true`)

### 4) `POST /api/notifications/alerts`

Use `NotificationService.sendAlertCampaign()` for specials/sales.
Channels can be combined based on user preferences.

### 5) `POST /api/intake`

Use `sendIntakeToClinic({ emailChannel, clinicEmail, submission })`.
- Persist JSON payload in `IntakeForm` table
- Mark `emailSent = true` when send succeeds

## Environment variables required

```bash
# OpenAI
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=Oak Crest Vet <no-reply@oakcrestvet.com>

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=

# Google Calendar
GOOGLE_CALENDAR_ACCESS_TOKEN=
GOOGLE_CALENDAR_ID=
CALENDAR_DEFAULT_TIMEZONE=America/New_York

# Outlook
OUTLOOK_CALENDAR_ACCESS_TOKEN=
OUTLOOK_CALENDAR_OWNER=

# Calendly
CALENDLY_PERSONAL_ACCESS_TOKEN=
CALENDLY_EVENT_TYPE_URI=
CALENDLY_ORGANIZATION_URI=
```

## Frontend/mobile contract notes

- Chat UI should handle `escalation === "emergency"` with a red banner and call-now CTA.
- If `shouldOfferBooking === true`, show quick button: "Book Appointment".
- Notification preferences should map user opt-ins by channel (email/sms/push).
- Intake form payload should align with `IntakeSubmission` type in package.

## Known constraints

- Calendly adapter currently produces one-time scheduling links and supports list queries; direct update/cancel should be handled via stored Calendly links or dedicated invitee APIs.
- Token refresh flows for Google/Outlook are expected to be implemented in backend auth services (outside this package).
