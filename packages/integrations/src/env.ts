function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }

  return value;
}

export function loadOpenAiEnv() {
  return {
    apiKey: required("OPENAI_API_KEY"),
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
  };
}

export function loadResendEnv() {
  return {
    apiKey: required("RESEND_API_KEY"),
    fromEmail: required("RESEND_FROM_EMAIL"),
  };
}

export function loadTwilioEnv() {
  return {
    accountSid: required("TWILIO_ACCOUNT_SID"),
    authToken: required("TWILIO_AUTH_TOKEN"),
    fromNumber: required("TWILIO_FROM_NUMBER"),
  };
}

export function loadGoogleCalendarEnv() {
  return {
    accessToken: required("GOOGLE_CALENDAR_ACCESS_TOKEN"),
    calendarId: required("GOOGLE_CALENDAR_ID"),
    timezone: process.env.CALENDAR_DEFAULT_TIMEZONE,
  };
}

export function loadOutlookCalendarEnv() {
  return {
    accessToken: required("OUTLOOK_CALENDAR_ACCESS_TOKEN"),
    calendarOwner: process.env.OUTLOOK_CALENDAR_OWNER,
    timezone: process.env.CALENDAR_DEFAULT_TIMEZONE,
  };
}

export function loadCalendlyEnv() {
  return {
    personalAccessToken: required("CALENDLY_PERSONAL_ACCESS_TOKEN"),
    eventTypeUri: required("CALENDLY_EVENT_TYPE_URI"),
    organizationUri: process.env.CALENDLY_ORGANIZATION_URI,
  };
}
