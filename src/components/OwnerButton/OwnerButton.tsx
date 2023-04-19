import React from 'react';
import { OwnerButtonType } from './types';

const OwnerButton: React.FC<OwnerButtonType> = ({ owner }) => {
  const [isOwnerActive, setIsOwnerActive] = React.useState(false);

  const ownerWrapperElement = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <button
        className={`cards__owner`}
        type='button'
        title={`Создатель: ${owner.name}`}
        onPointerEnter={() => {
          if (!ownerWrapperElement.current?.classList.contains('cards__owner-wrapper_active')) {
            ownerWrapperElement.current?.classList.add('cards__owner-wrapper_on-pointer-enter');
          }
        }}
        onPointerLeave={() => {
          if (!ownerWrapperElement.current?.classList.contains('cards__owner-wrapper_active')) {
            ownerWrapperElement.current?.classList.remove('cards__owner-wrapper_on-pointer-enter');
          }
        }}
        onClick={() => {
          setIsOwnerActive(!isOwnerActive);
        }}
      ></button>
      <div
        ref={ownerWrapperElement}
        className={`cards__owner-wrapper ${isOwnerActive ? 'cards__owner-wrapper_active' : ''}`}
      >
        <div
          className={`cards__owner-content ${isOwnerActive ? 'cards__owner-content_active' : ''}`}
        >
          <p className='cards__owner-title'>Создатель</p>
          <img className='cards__owner-avatar' src={owner.avatar} alt={owner.name} />
          <h3 className='cards__owner-name'>{owner.name}</h3>
          <p className='cards__owner-about'>{owner.about}</p>
          <p className='cards__owner-about'>{owner.cohort}</p>
        </div>
      </div>
    </>
  );
};

export default OwnerButton;
