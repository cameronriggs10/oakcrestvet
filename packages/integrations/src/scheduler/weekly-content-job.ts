import type { BlogDraft, ClinicProfile } from "../types";
import { WeeklyContentGenerator } from "../ai/content-generator";

export interface WeeklyBlogJobInput {
  clinicProfile: ClinicProfile;
  topicOverride?: string;
  season?: string;
  audience?: string;
  serviceHighlights?: string[];
}

export interface WeeklyBlogJobResult {
  topic: string;
  draft: BlogDraft;
}

export async function runWeeklyBlogJob(params: {
  generator: WeeklyContentGenerator;
  input: WeeklyBlogJobInput;
  persistDraft: (draft: BlogDraft) => Promise<void>;
}): Promise<WeeklyBlogJobResult> {
  const topics = params.input.topicOverride
    ? [params.input.topicOverride]
    : await params.generator.suggestTrendingTopics();

  const topic = topics[0] ?? "Seasonal preventive care for pets";

  const draft = await params.generator.generateDraft({
    clinicProfile: params.input.clinicProfile,
    topic,
    season: params.input.season,
    audience: params.input.audience,
    serviceHighlights: params.input.serviceHighlights,
  });

  await params.persistDraft(draft);

  return {
    topic,
    draft,
  };
}
