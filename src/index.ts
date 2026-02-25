import { AnimalService } from "./classes/animals.service";
import type { Animal } from "./interfaces/animal";

const animalService = new AnimalService();

async function showAllPetsOnConsole(): Promise<void> {
  try {
    const pets: Animal[] = await animalService.getAllPets();

    console.log("Listado completo de pets:");
    pets.forEach((pet) => {
      console.log(pet.name, pet.age, pet.species);
    });

  } catch (error) {
    console.error("Error obteniendo pets:", error);
  }
}

showAllPetsOnConsole();





