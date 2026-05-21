export async function fetchJson<T>(
  url: string,
  init?: RequestInit,
  failMessage = "Request failed",
): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    const payload = await response.text();
    throw new Error(`${failMessage}: ${response.status} ${payload}`);
  }

  return response.json() as Promise<T>;
}
