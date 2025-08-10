const API_URL = import.meta.env.VITE_API_URL;

export async function fetchBooks() {
  const res = await fetch(`${API_URL}/books`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export async function createBook(data: any) {
  const res = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create book");
  return res.json();
}

export async function getBook(id: string) {
  const res = await fetch(`${API_URL}/books/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
}

export async function updateBook(id: string, data: any) {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update book");
  return res.json();
}

export async function deleteBook(id: string) {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete book");
}
