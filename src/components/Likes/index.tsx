import React from 'react';

import { LikePropsType } from './types';

const Likes: React.FC<LikePropsType> = ({ likes, isLiked }) => {
  if (likes.length === 0) {
    return <span></span>;
  }

  const usersElement = likes.map((user, idx) => {
    if (idx > 2) {
      return '';
    }
    return (
      <div
        className={`likes__user ${isLiked && 'likes__user_active'}`}
        title={user.name + ' ' + user.about}
      >
        <img className='likes__avatar' src={user.avatar} alt={user.name} />
      </div>
    );
  });

  return (
    <>
      <span className={`likes ${isLiked && 'likes_active'}`}>{usersElement}</span>
    </>
  );
};

export default Likes;
