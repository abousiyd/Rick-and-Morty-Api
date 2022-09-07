import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import CardInfo from "../components/CardInfo";
import Modal from "../components/modal";
import { ICharacters, ICharacter, IPagination } from "../types";
import Characters from "../api/api";
import { API_URL, NEXT, PREV } from "../constants";

const Gallery: React.FC = (): JSX.Element => {
  const [active, setActive] = useState(false);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [selectedCharacter, setSelectedcharacter] = useState<ICharacter | null>(null);
  const [pagination, setPagination] = useState<IPagination>({
    prev: null,
    next: null,
  });
  
  useEffect(() => {
    loadCharacters(API_URL);
  }, []);

  async function loadCharacters(page: string) {
    try {
      const data: ICharacters = await Characters.all(page);
      const result: ICharacter[] = Object.values(data.results);
      setPagination(data.info);
      setCharacters(result);
    } catch (error: Error | unknown) {
      if (error instanceof Error) console.log("error loading characters");
    }
  }

  const handleOpenModal = (character: ICharacter) => {
    setSelectedcharacter(character);
    setActive(!active);
  };

  const handleCloseModal = () => {
    setSelectedcharacter(null);
    setActive(false);
  };

  const handleChangePage = (type: string) => {
    if (type === NEXT && pagination.next) loadCharacters(pagination.next);
    if (type === PREV && pagination.prev) loadCharacters(pagination.prev);
  };

  return (
    <div className="characters">
      <h1 className="characters__title">CHARACTERS</h1>

      <div className="characters__result">
        {characters.map(
          (character: ICharacter): JSX.Element => (
            <Card
              openModal={handleOpenModal}
              key={character.id}
              {...character}
            />
          )
        )}
      </div>

      {selectedCharacter && (
        <Modal active={active}>
          <CardInfo closeModal={handleCloseModal} {...selectedCharacter} />
        </Modal>
      )}

      <div className="pagination">
        <button
          disabled={!pagination.prev}
          onClick={() => handleChangePage(PREV)}
        >
          Prev
        </button>
        <button
          disabled={!pagination.next}
          onClick={() => handleChangePage(NEXT)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Gallery;
