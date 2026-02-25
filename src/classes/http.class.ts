export class Http {
  async ajax<T>(method: string, url: string, headers?: HeadersInit, body?: any): Promise<T> {

    const options: RequestInit = {method,};

    if (headers) options.headers = headers;
    if (body) options.body = body;

    const resp = await fetch(url, options);

    if (!resp.ok) {
      try {
        throw await resp.json();
      } catch {
        throw new Error("Error en la petición");
      }
    }

    if (resp.status !== 204) {
      try {
        return (await resp.json()) as T;
      } catch {
        return null as T;
      }
    }

    return null as T;
  }

  get<T>(url: string): Promise<T> {
    return this.ajax<T>("GET", url);
  }

  post<T, U>(url: string, data?: U): Promise<T> {
    return this.ajax<T>(
      "POST",
      url,
      { "Content-Type": "application/json" },
      JSON.stringify(data)
    );
  }

  // ⭐ NECESARIO para enviar FormData
  postForm<T>(url: string, data: FormData): Promise<T> {
    return this.ajax<T>("POST", url, undefined, data);
  }

  put<T, U>(url: string, data: U): Promise<T> {
    return this.ajax<T>(
      "PUT",
      url,
      { "Content-Type": "application/json" },
      JSON.stringify(data)
    );
  }

  delete<T>(url: string): Promise<T> {
    return this.ajax<T>("DELETE", url);
  }
}