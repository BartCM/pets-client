import { AnimalService } from "./classes/animals.service";
import type { Animal } from "./interfaces/animal";

const animalService = new AnimalService();

async function showAllPetsOnConsole(): Promise<void> {
  try {
    const pets: Animal[] = await animalService.getAllPets();

    const tbody =
      document.querySelector<HTMLTableSectionElement>("#animal-list")!;
    const template =
      document.querySelector<HTMLTemplateElement>("#animal-row-template")!;

    pets.forEach((pet) => {
      const tr = template.content
        .querySelector("tr")!
        .cloneNode(true) as HTMLTableRowElement;

      tr.querySelector(".animal-name")!.textContent = pet.name;
      tr.querySelector(".animal-species")!.textContent = pet.species;
      tr.querySelector(".animal-age")!.textContent = String(pet.age);

      // Funcionalidad borrar
      tr.querySelector<HTMLButtonElement>(".delete-btn")!.addEventListener(
        "click",
        async () => {
          try {
            await animalService.delete(pet.id); // borra en backend
            tr.remove(); // borra la fila en la tabla
          } catch (error) {
            console.error("Error borrando animal:", error);
          }
        }
      );

      tbody.append(tr);
    });
  } catch (error) {
    console.error("Error obteniendo pets:", error);
  }
}

showAllPetsOnConsole();





