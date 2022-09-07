import { useEffect, useState, useRef } from "react";
import { ICharacter } from "../types";
import Characters from "../api/api";
import { UNKNOWN } from "../constants";

interface ICardInfo extends ICharacter {
  closeModal: () => void;
}

const CardInfo = (props: ICardInfo) => {
  const { name, image, closeModal, origin } = props;
  const [residents, setResidents] = useState<ICharacter[]>([]);
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadResidents() {
      try {
        const data: ICharacter[] = await Characters.residents(origin.url);
        setResidents(data);
      } catch (error: Error | unknown) {
        if (error instanceof Error) console.log("error loading characters");
      }
    }

    loadResidents();

    const handleClickOutside = (event: MouseEventInit | any) => {
        if (myRef.current && !myRef.current.contains(event.target))
          closeModal();
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCloseModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    closeModal();
  };

  return (
    <div className="cardinfo" ref={myRef}>
      <button
        role="button"
        className="cardinfo__close"
        onClick={handleCloseModal}
      >
        <i className="far fa-times-circle"></i>
      </button>
      <img className="cardinfo__img" src={image} alt={name} />
      <h2 className="cardinfo__title">{name}</h2>
      <p className="cardinfo__location">
        <i className="fa-solid fa-crosshairs icon"></i> {origin.name}
      </p>
      {origin.name !== UNKNOWN && (
        <p className="cardinfo__location">
          Personajes que también estan en {origin.name}
        </p>
      )}
      <div className="cardinfo__residents">
        {residents.map((resident) => (
          <img key={resident.id} src={resident.image} alt={resident.name} />
        ))}
      </div>
    </div>
  );
};

export default CardInfo;
