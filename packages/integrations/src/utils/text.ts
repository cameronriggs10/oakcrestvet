export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(input: string): string[] {
  return normalizeText(input).split(" ").filter(Boolean);
}

export function slugify(input: string): string {
  return normalizeText(input).replace(/\s+/g, "-");
}
