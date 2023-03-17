import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Header.module.css';
import Logout from './Logout/Logout';

const Header = (props) => {
  const handleLogout = (e) => {
    e.preventDefault();
    props.logout();
  }

  return (
    <header styleName="main-header" className="theme">
      {props.loggedUser && <Logout action={handleLogout}/>}
      <ul styleName="main-header__content info">
        <li styleName="info__item">Лабораторная работа #4</li>
        <li styleName="info__item">#345</li>
      </ul>
      <ul styleName="main-header__content authors">
        <li styleName="authors__item">Полуянов Александр Михайлович (P32141)</li>
      </ul>
    </header>
  );
}

export default CSSModules(Header, styles, {allowMultiple: true, handleNotFoundStyleName: 'ignore'});
