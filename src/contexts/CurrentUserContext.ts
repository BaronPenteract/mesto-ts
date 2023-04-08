import React from 'react';
import { UserType } from './UserType';

export const CurrentUserContext: React.Context<UserType> = React.createContext({
  name: '',
  about: '',
  avatar: '',
  cohort: '',
  _id: '',
});
