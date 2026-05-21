export type CalendarProvider = "GOOGLE" | "OUTLOOK" | "CALENDLY";

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  keywords?: string[];
  category?: string;
}

export interface ServiceInfo {
  id?: string;
  name: string;
  description: string;
  price?: number;
  durationMinutes?: number;
}

export interface ClinicProfile {
  name: string;
  hours: string;
  phone: string;
  email: string;
  bookingUrl?: string;
  emergencyClinicName?: string;
  emergencyClinicPhone?: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  faqs?: FaqItem[];
  services?: ServiceInfo[];
  clinicProfile: ClinicProfile;
  allowGeneralPetHealthAnswers?: boolean;
}

export interface ChatResponse {
  reply: string;
  matchedFaqId?: string;
  shouldOfferBooking: boolean;
  escalation: "none" | "clinic" | "emergency";
}

export interface BlogDraft {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  callToAction: string;
  suggestedSlug: string;
}

export interface CalendarEventInput {
  title: string;
  description?: string;
  startIso: string;
  endIso: string;
  attendeeEmail?: string;
  attendeeName?: string;
  location?: string;
  timezone?: string;
}

export interface CalendarEventResult {
  externalEventId: string;
  provider: CalendarProvider;
  htmlLink?: string;
  raw?: unknown;
}

export interface AppointmentReminderInput {
  clientName: string;
  petName: string;
  appointmentIso: string;
  serviceName: string;
  destinationEmail?: string;
  destinationPhone?: string;
  pushToken?: string;
}
