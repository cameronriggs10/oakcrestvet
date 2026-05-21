import OpenAI from "openai";
import type { ChatRequest, ChatResponse, FaqItem } from "../types";
import { normalizeText, tokenize } from "../utils/text";

const BOOKING_KEYWORDS = [
  "book",
  "appointment",
  "schedule",
  "visit",
  "checkup",
  "vaccination",
  "vaccine",
  "sick",
  "exam",
];

const EMERGENCY_KEYWORDS = [
  "seizure",
  "bleeding",
  "collapse",
  "not breathing",
  "difficulty breathing",
  "poison",
  "toxin",
  "hit by car",
  "unresponsive",
  "severe pain",
  "can't stand",
  "cant stand",
  "vomiting blood",
];

export interface VetChatbotServiceConfig {
  apiKey?: string;
  model?: string;
}

export class VetChatbotService {
  private readonly client?: OpenAI;
  private readonly model: string;

  constructor(config: VetChatbotServiceConfig = {}) {
    this.model = config.model ?? "gpt-4o-mini";
    if (config.apiKey) {
      this.client = new OpenAI({ apiKey: config.apiKey });
    }
  }

  async reply(request: ChatRequest): Promise<ChatResponse> {
    const normalizedUserMessage = normalizeText(request.message);

    if (this.containsAny(normalizedUserMessage, EMERGENCY_KEYWORDS)) {
      return {
        reply: this.emergencyResponse(request),
        shouldOfferBooking: false,
        escalation: "emergency",
      };
    }

    const faqMatch = this.findFaqMatch(normalizedUserMessage, request.faqs ?? []);
    if (faqMatch && faqMatch.score >= 0.3) {
      return {
        reply: `${faqMatch.item.answer}${this.bookingPrompt(request.clinicProfile.bookingUrl)}`,
        matchedFaqId: faqMatch.item.id,
        shouldOfferBooking: this.containsAny(normalizedUserMessage, BOOKING_KEYWORDS),
        escalation: "none",
      };
    }

    if (!this.client) {
      return {
        reply:
          "I can help with general pet health questions and appointment support. " +
          "To answer personalized medical concerns, please contact Oak Crest directly.",
        shouldOfferBooking: this.containsAny(normalizedUserMessage, BOOKING_KEYWORDS),
        escalation: "clinic",
      };
    }

    const completion = await this.client.chat.completions.create({
      model: this.model,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: this.buildSystemPrompt(request),
        },
        ...(request.history ?? []).map((message) => ({
          role: message.role,
          content: message.content,
        })),
        {
          role: "user",
          content: request.message,
        },
      ],
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    return {
      reply:
        reply ??
        "I’m here to help with pet health guidance and booking. Please call us if this is urgent.",
      shouldOfferBooking: this.containsAny(normalizedUserMessage, BOOKING_KEYWORDS),
      escalation: "none",
    };
  }

  private buildSystemPrompt(request: ChatRequest): string {
    const faqContext = (request.faqs ?? [])
      .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
      .join("\n\n");

    const servicesContext = (request.services ?? [])
      .map(
        (service) =>
          `- ${service.name}: ${service.description}${
            service.price ? ` ($${service.price.toFixed(2)})` : ""
          }`,
      )
      .join("\n");

    return [
      `You are Oak Crest Veterinary Services assistant for clients and new pet parents.`,
      `Tone: warm, practical, and caring.`,
      `Never diagnose. Share educational guidance only.`,
      `If symptoms sound urgent, advise immediate emergency vet care and mention ${request.clinicProfile.emergencyClinicName ?? "a nearby 24/7 emergency clinic"}.`,
      `When relevant, invite the client to book an appointment using ${
        request.clinicProfile.bookingUrl ?? "the clinic booking portal"
      }.`,
      `Clinic profile: ${request.clinicProfile.name}, Hours: ${request.clinicProfile.hours}, Phone: ${request.clinicProfile.phone}, Email: ${request.clinicProfile.email}.`,
      request.allowGeneralPetHealthAnswers
        ? "General pet-health educational responses are allowed."
        : "Only answer with clinic-specific info and FAQ context.",
      faqContext ? `FAQ context:\n${faqContext}` : "",
      servicesContext ? `Services:\n${servicesContext}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  private findFaqMatch(normalizedUserMessage: string, faqs: FaqItem[]) {
    const queryTokens = new Set(tokenize(normalizedUserMessage));
    let best: { item: FaqItem; score: number } | undefined;

    for (const item of faqs) {
      const searchable = [item.question, ...(item.keywords ?? [])].join(" ");
      const candidateTokens = tokenize(searchable);
      const overlap = candidateTokens.filter((token) => queryTokens.has(token)).length;
      const score = overlap / Math.max(candidateTokens.length, 1);

      if (!best || score > best.score) {
        best = { item, score };
      }
    }

    return best;
  }

  private containsAny(normalizedText: string, candidates: string[]): boolean {
    return candidates.some((candidate) => normalizedText.includes(normalizeText(candidate)));
  }

  private emergencyResponse(request: ChatRequest): string {
    return [
      "This may be an emergency. Please seek immediate veterinary care right now.",
      `Call ${request.clinicProfile.name}: ${request.clinicProfile.phone}.`,
      request.clinicProfile.emergencyClinicPhone
        ? `If Oak Crest is unavailable, contact ${
            request.clinicProfile.emergencyClinicName ?? "your nearest emergency clinic"
          }: ${request.clinicProfile.emergencyClinicPhone}.`
        : "If Oak Crest is unavailable, contact your nearest 24/7 emergency veterinary hospital.",
    ].join(" ");
  }

  private bookingPrompt(bookingUrl?: string): string {
    if (!bookingUrl) {
      return "";
    }

    return `\n\nIf you'd like, you can book now here: ${bookingUrl}`;
  }
}
