interface Type {
  name: string;
  url: string;
}
export interface Pokemon {
  name: string;
  sprites: { front_default: string };
  types: ReadonlyArray<{ type: Type }>;
}

export const isPokemon = (x: unknown): x is Pokemon =>
  !!x && Object.hasOwn(x, "name") && Object.hasOwn(x, "sprites");

export const isPokemonArray = (x: unknown): x is ReadonlyArray<Pokemon> =>
  !!x && Array.isArray(x) && x.every(isPokemon);
