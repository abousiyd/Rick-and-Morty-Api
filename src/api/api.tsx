import { ICharacters, ICharacter } from "../types";
import { TOTAL_RESIDENTS_TO_SHOW } from "../constants";

const Characters = {
  async all(page: string): Promise<ICharacters> {
    
    try {
      const response = await fetch(page);
      const posts: ICharacters = await response.json();
      return posts;
    } catch (error) {
      throw new Error("The data could not be loaded :(");
    }
  },
  async residents(urlOrigin: string): Promise<ICharacter[]> {
    try {
      const response = await fetch(urlOrigin);
      const planet = await response.json();

      const residents = await Promise.all(
        planet.residents.slice(0, TOTAL_RESIDENTS_TO_SHOW).map(async (url: string) => {
          const resp = await fetch(url);
          return resp.json();
        })
      );

      return residents;
    } catch (error) {
      throw new Error("The data could not be loaded :(");
    }
  },
};

export default Characters;
