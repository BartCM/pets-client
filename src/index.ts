import { AnimalService } from "./classes/animals.service";
import type { Animal } from "./interfaces/animal";

const animalService = new AnimalService();

async function showAllPetsOnConsole(): Promise<void> {
  try {
    const pets: Animal[] = await animalService.getAllPets();
    const contador = document.querySelector<HTMLSpanElement>("#animal-count")!;

    contador.textContent = `${pets.length} animals`;

    pets.forEach(insertarAnimal);

  } catch (error) {
    console.error("Error obteniendo pets:", error);
  }
}

// función que inserta 1 animal en la tabla
function insertarAnimal(pet: Animal): void {
  const tbody =
    document.querySelector<HTMLTableSectionElement>("#animal-list")!;
  const template =
    document.querySelector<HTMLTemplateElement>("#animal-row-template")!;

  const tr = template.content
    .querySelector("tr")!
    .cloneNode(true) as HTMLTableRowElement;

  tr.querySelector(".animal-name")!.textContent = pet.name;
  tr.querySelector(".animal-species")!.textContent = pet.species;
  tr.querySelector(".animal-age")!.textContent = String(pet.age);

  tr.querySelector<HTMLButtonElement>(".delete-btn")!.addEventListener(
    "click",
    async () => {
      try {
        await animalService.delete(pet.id);
        tr.remove();
      } catch (error) {
        console.error("Error borrando animal:", error);
      }
    }
  );

  tbody.append(tr);
}

// función para añadir un animal desde el formulario
async function añadirNuevoAnimal(event: Event): Promise<void> {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const animal = {
    name: formData.get("name") as string,
    species: formData.get("species") as string,
    age: formData.get("age") as string,
  };

  try {
    const nuevoAnimal = await animalService.create(animal);
    insertarAnimal(nuevoAnimal);

    form.reset();

  } catch (error) {
    console.error("Error creando animal:", error);
  }
}

document.querySelector<HTMLFormElement>("#animal-form")!
  .addEventListener("submit", añadirNuevoAnimal);

await showAllPetsOnConsole();