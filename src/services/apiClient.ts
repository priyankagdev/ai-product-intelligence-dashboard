async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json();
    if (
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof body.error === "string"
    ) {
      return body.error;
    }
  } catch {
    // The error body was not JSON; fall back to the status text below.
  }

  return response.statusText || "No error details provided";
}

export async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(path, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new Error(`GET ${path} failed with ${response.status}: ${message}`);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new Error(`GET ${path} returned a response that is not valid JSON`);
  }
}
