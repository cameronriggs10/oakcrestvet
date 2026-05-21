import OpenAI from "openai";
import type { BlogDraft, ClinicProfile } from "../types";
import { slugify } from "../utils/text";

export interface BlogGenerationRequest {
  clinicProfile: ClinicProfile;
  topic: string;
  audience?: string;
  season?: string;
  serviceHighlights?: string[];
}

export interface ContentGeneratorConfig {
  apiKey: string;
  model?: string;
}

export class WeeklyContentGenerator {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor(config: ContentGeneratorConfig) {
    this.client = new OpenAI({ apiKey: config.apiKey });
    this.model = config.model ?? "gpt-4o-mini";
  }

  async generateDraft(input: BlogGenerationRequest): Promise<BlogDraft> {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "You are a veterinary content strategist. Return strict JSON with keys: title, excerpt, content, tags, callToAction.",
        },
        {
          role: "user",
          content: [
            `Clinic: ${input.clinicProfile.name}`,
            `Topic: ${input.topic}`,
            `Audience: ${input.audience ?? "pet owners in local community"}`,
            input.season ? `Season/context: ${input.season}` : "",
            input.serviceHighlights?.length
              ? `Service highlights: ${input.serviceHighlights.join(", ")}`
              : "",
            "Tone requirements: warm, caring, educational, practical.",
            "Length requirement: 700-1200 words.",
            "Include a disclaimer that emergencies require immediate veterinary care.",
          ]
            .filter(Boolean)
            .join("\n"),
        },
      ],
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = safeJsonParse(raw);

    const title = readString(parsed.title, `Pet Health Tips: ${input.topic}`);
    const excerpt = readString(
      parsed.excerpt,
      "Expert guidance from Oak Crest Veterinary Services for happier, healthier pets.",
    );
    const content = readString(
      parsed.content,
      `This week we are covering ${input.topic}. Contact ${input.clinicProfile.name} for personalized care.`,
    );
    const callToAction = readString(
      parsed.callToAction,
      `Need help with your pet? Contact ${input.clinicProfile.name} to book an appointment.`,
    );

    return {
      title,
      excerpt,
      content,
      callToAction,
      tags: normalizeTags(parsed.tags, input.topic),
      suggestedSlug: slugify(title),
    };
  }

  async suggestTrendingTopics(): Promise<string[]> {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content:
            'Return strict JSON object with key "topics" as an array of 10 short topic strings relevant to US veterinary clinics this month.',
        },
      ],
      response_format: { type: "json_object" },
    });

    const parsed = safeJsonParse(completion.choices[0]?.message?.content ?? "{}");
    const topics = Array.isArray(parsed.topics)
      ? parsed.topics.filter((item) => typeof item === "string")
      : [];

    return topics.length
      ? topics
      : [
          "Summer heat safety for dogs and cats",
          "Tick prevention and parasite control",
          "Travel-ready pet wellness checklist",
          "Healthy weight management for pets",
          "Dental care habits for dogs and cats",
        ];
  }
}

function normalizeTags(tagsCandidate: unknown, topic: string): string[] {
  if (Array.isArray(tagsCandidate)) {
    const tags = tagsCandidate.filter((item): item is string => typeof item === "string");
    if (tags.length) {
      return tags;
    }
  }

  return ["pet-health", slugify(topic), "oak-crest-vet"];
}

function safeJsonParse(value: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as Record<string, unknown>;
    }

    return {};
  } catch {
    return {};
  }
}

function readString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}
