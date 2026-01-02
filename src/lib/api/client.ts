const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function apiClient<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API Error");
  }

  return res.json();
}
