import React, {useState, useEffect} from 'react';
import HeaderContainer from './Header/HeaderContainer';
import TitleHelmet from './common/TitleHelmet'
import MainContent from './MainContent/MainContent';
import IndexContent from './IndexContent/IndexContent'
import Preloader from './Preloader/Preloader';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
// import {BrowserRouter, Route, Switch} from "react-router-dom";
// import { Switch, Route } from 'react-router-dom';

const App = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      props.initializeAuth();
      setIsLoaded(true);
    }
  }, [isLoaded, props]);
  //
  if (props.isLoading) {
    return (
      <BrowserRouter>
        <HeaderContainer/>
        <Switch>
          <Route path="/">
            <TitleHelmet title="Лабораторная работа #4 - Загрузка..."/>
            <Preloader/>
          </Route>
        </Switch>
      </BrowserRouter>
    )

  } else if (props.loggedUser) {
    return (
      <BrowserRouter>
        <Route path="/main">
          <HeaderContainer/>
          <TitleHelmet title="Лабораторная работа #4 - Основная страница"/>
          <MainContent/>
        </Route>
        <Route path="/login">
          <Redirect to={"/main"}/>
        </Route>
      </BrowserRouter>);
  } else {
    return (
      <BrowserRouter>
        <HeaderContainer/>
        {/*<Route path="/login">*/}
          <TitleHelmet title="Лабораторная работа #4 - Страница авторизации"/>
          <IndexContent/>
          <Redirect to="/login" />
        {/*</Route>*/}
      </BrowserRouter>
    );
  }

  //
  // if (props.isLoading) {
  //   return (
  //     <div>
  //       <HeaderContainer />
  //       <TitleHelmet title="Лабораторная работа #4 - Загрузка..." />
  //       <Preloader />
  //     </div>
  //
  //   );
  // } else if (props.loggedUser) {
  //   return (
  //     <div>
  //       <HeaderContainer />
  //       <TitleHelmet title="Лабораторная работа #4 - Основная страница" />
  //       <MainContent />
  //     </div>
  //   );
  // }
  //   return (
  //     <div>
  //       <HeaderContainer />
  //       <TitleHelmet title="Лабораторная работа #4 - Страница авторизации" />
  //       <IndexContent />
  //     </div>
  //   );
}

export default App;
