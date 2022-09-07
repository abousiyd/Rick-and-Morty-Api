import { ICharacter } from '../types';

interface ICard extends ICharacter {
    openModal: (character: ICharacter) => void
}

const Card = (character: ICard) => {
  const { name, image, openModal } = character;
  return (
    <div className='card' onClick={() => openModal(character)}>

        <img className='card__image' src={image} alt={name} />
        <h2 className='card__title'>{name}</h2>
        <span className='card__origin'><i className="fa-solid fa-crosshairs icon"></i> {character.origin.name}</span>
    </div>

  )
}

export default Card