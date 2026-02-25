import { Http } from "../classes/http.class";
import { SERVER_BASE_URL } from "../classes/constante";
import type { Animals } from "../interfaces/animals";

export class AnimalService {
  #http = new Http();

  async getAllPets(): Promise<Animals> {
    const res = await this.#http.get<{ animals: Animals }>(
      `${SERVER_BASE_URL}/animals`
    );
    return res.animals;
  }

  async create(data: { name: string; species: string; age: string }): Promise<Animals> {
    const res = await this.#http.post<{ present: Animals }, typeof data>(
      `${SERVER_BASE_URL}/animals`,
      data
    );

    return res.present;
  }

  async delete(id: number): Promise<void> {
    await this.#http.delete(`${SERVER_BASE_URL}/animals/${id}`);
  }
}