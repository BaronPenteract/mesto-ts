import React, { RefObject } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import { checkToken, login, register } from '../utils/Auth';

import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import errorImage from '../images/icons/error.svg';
import successImage from '../images/icons/success.svg';
import { CardType } from './Card/types';
import { UserType } from '../contexts/UserType';
import { LoginType } from './Login/types';
import { RegisterType } from './Register/types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState(React.useContext(CurrentUserContext));
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [infoToolTipContent, setInfoToolTipContent] = React.useState({
    text: '',
    image: '',
  });

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [cardToDelete, setCardToDelete] = React.useState<CardType | null>(null);

  const [selectedCard, setSelectedCard] = React.useState<CardType | null>(null);

  const [cards, setCards] = React.useState<CardType[]>([]);

  const navigate = useNavigate();

  /* -----------------------------------------------TOKEN */
  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    /* ------------------------------------------CARDS DATA */
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch(api.handleError);
    } else {
      setCards([]);
    }
  }, [loggedIn]);

  //-------------------------------------------------------------------------GET USER

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUser()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch(api.handleError);
    } else {
      setCurrentUser({
        name: '',
        about: '',
        avatar: '',
        cohort: '',
        _id: '',
      });
    }
  }, [loggedIn]);

  //-------------------------------------------------------------------AVATAR
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  //-------------------------------------------------------------------PROFILE
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  //-------------------------------------------------------------------ADDCARD
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  //-------------------------------------------------------------------IMAGE
  function handleImageClick() {
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setCardToDelete(null);
  }

  //-----------------------------------------------------------------------CARD HANDLERS
  function handleCardClick(card: CardType) {
    handleImageClick();
    setSelectedCard(card);
  }

  function handleCardLike(card: CardType) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => (c._id === card._id ? newCard : c));
        });
      })
      .catch(api.handleError);
  }

  function handleCardDelete(card: CardType) {
    setIsConfirmPopupOpen(true);
    setCardToDelete(card);
  }

  function confirmSubmitAction(
    card: CardType,
    submitButton: RefObject<HTMLButtonElement>,
    awaitText: string,
    originalText: string,
  ) {
    renderLoading(true, submitButton, awaitText, originalText);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((c) => c._id !== card._id);
        });
        closeAllPopups();
      })
      .catch(api.handleError)
      .finally(() => {
        renderLoading(false, submitButton, awaitText, originalText);
      });
  }

  function renderLoading(
    isLoading: boolean,
    buttonRef: RefObject<HTMLButtonElement>,
    awaitText: string,
    originalText: string,
  ) {
    if (buttonRef.current) {
      isLoading
        ? (buttonRef.current.textContent = awaitText)
        : (buttonRef.current.textContent = originalText);
    }
  }

  //------------------------------------------------------------------------USER UPDATE HANDLERS
  function handleUpdateUser(
    userData: UserType,
    submitButton: RefObject<HTMLButtonElement>,
    awaitText: string,
    originalText: string,
  ) {
    renderLoading(true, submitButton, awaitText, originalText);
    api
      .setUser(userData)
      .then((user) => {
        setCurrentUser({ ...currentUser, ...user });
        closeAllPopups();
      })
      .catch(api.handleError)
      .finally(() => {
        renderLoading(false, submitButton, awaitText, originalText);
      });
  }

  function handleUpdateAvatar(
    avatar: string,
    submitButton: RefObject<HTMLButtonElement>,
    awaitText: string,
    originalText: string,
  ) {
    renderLoading(true, submitButton, awaitText, originalText);
    api
      .setAvatar(avatar)
      .then((user) => {
        setCurrentUser({ ...currentUser, ...user });
        closeAllPopups();
      })
      .catch(api.handleError)
      .finally(() => {
        renderLoading(false, submitButton, awaitText, originalText);
      });
  }

  function handleAddPlace(
    card: CardType,
    submitButton: RefObject<HTMLButtonElement>,
    awaitText: string,
    originalText: string,
  ) {
    renderLoading(true, submitButton, awaitText, originalText);
    api
      .addCard(card)
      .then((cardData) => {
        setCards([cardData, ...cards]);
        closeAllPopups();
      })
      .catch(api.handleError)
      .finally(() => {
        renderLoading(false, submitButton, awaitText, originalText);
      });
  }

  /* -------------------------------------------------------------------AUTH HANLERS */
  const handleLogin = (
    formValue: LoginType,
    submitButton: RefObject<HTMLButtonElement>,
    awaitText: string,
    originalText: string,
  ) => {
    renderLoading(true, submitButton, awaitText, originalText);
    login(formValue)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setEmail(formValue.email);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoToolTipContent({
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
          image: errorImage,
        });
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, submitButton, awaitText, originalText);
      });
  };

  const handleRegister = (
    formValue: RegisterType,
    submitButton: RefObject<HTMLButtonElement>,
    awaitText: string,
    originalText: string,
  ) => {
    renderLoading(true, submitButton, awaitText, originalText);
    register(formValue)
      .then((res) => {
        if (res) {
          navigate('/sing-up', { replace: true });
          setIsInfoTooltipOpen(true);
          setInfoToolTipContent({
            text: 'Вы успешно зарегестрировались!',
            image: successImage,
          });
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoToolTipContent({
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
          image: errorImage,
        });
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, submitButton, awaitText, originalText);
      });
  };

  const handleSingOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sing-up', { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSingOut={handleSingOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                props={{
                  onEditProfile: handleEditProfileClick,
                  onAddPlace: handleAddPlaceClick,
                  onEditAvatar: handleEditAvatarClick,
                  onCardClick: handleCardClick,
                  onCardDelete: handleCardDelete,
                  onCardLike: handleCardLike,
                  cards: cards,
                }}
              />
            }
          />
          <Route path="/sing-up" element={<Login onLogin={handleLogin} />} />
          <Route path="/sing-in" element={<Register onRegister={handleRegister} />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
        {/* ------------------------------------------------------------------------AVATAR FORM */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>
        {/* --------------------------------------------------------------------------PROFILE FORM */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* --------------------------------------------------------------------------------ADD CARD FORM */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        ></AddPlacePopup>
        {/* ------------------------------------------------------------------------CONFIRM FORM */}
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          confirmSubmitAction={(
            submitButton: RefObject<HTMLButtonElement>,
            awaitText: string,
            originalText: string,
          ) => {
            cardToDelete &&
              confirmSubmitAction(cardToDelete, submitButton, awaitText, originalText);
          }}
        ></ConfirmPopup>
        {/* ---------------------------------------------------------------------IMAGE POPUP */}
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        {/* ------------------------------------------------------------------------- InfoTooltip*/}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          infoToolTipContent={infoToolTipContent}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
