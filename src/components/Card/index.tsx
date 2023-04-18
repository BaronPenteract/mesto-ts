import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Likes from '../Likes';
import { CardPropsType } from './types';

const Card: React.FC<CardPropsType> = ({
  name,
  link,
  likes,
  owner,
  createdAt,
  onCardClick,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const [isOwnerActive, setIsOwnerActive] = React.useState(false);

  const isOwner = owner._id === currentUser._id;
  const isLiked = likes.some((user) => user._id === currentUser._id);

  const handleDeleteClick = () => {
    onCardDelete();
  };

  const handleLikeClick = () => {
    onCardLike();
  };

  const convertDate = (date: Date): string => {
    return date.toLocaleString('ru-RU', {
      year: '2-digit',
      month: '2-digit',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <article>
      <div className='cards__item'>
        <button
          className={`cards__owner`}
          type='button'
          title={`Создатель: ${owner.name}`}
          onClick={() => {
            setIsOwnerActive(!isOwnerActive);
          }}
        ></button>
        <div
          className={`cards__owner-wrapper ${isOwnerActive ? 'cards__owner-wrapper_active' : ''}`}
        >
          <p>Создатель</p>
          <img className='' src={owner.avatar} alt={owner.name} />
          <h3>{owner.name}</h3>
          <p>{owner.about}</p>
        </div>
        <button
          className={`cards__delete ${isOwner && 'cards__delete_active'}`}
          type='button'
          title='Удалить'
          onClick={handleDeleteClick}
        ></button>
        <img className='cards__image' src={link} alt={name} onClick={onCardClick} />
        <div className='cards__content'>
          <h2 className='cards__title'>{name}</h2>
          <div className='cards__info'>
            <div className={`cards__likes-container ${isLiked && 'cards__likes-container_active'}`}>
              <button
                className={`cards__like ${isLiked && 'cards__like_active'}`}
                type='button'
                title='Поставить лайк'
                onClick={handleLikeClick}
              ></button>
              <Likes likes={likes} isLiked={isLiked} />
              <span>{likes.length > 3 ? ' +' + (likes.length - 3) : ''}</span>
            </div>
            <span className='cards__info-date'>{convertDate(new Date(createdAt))}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
