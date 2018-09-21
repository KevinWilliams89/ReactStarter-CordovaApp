import React from 'react';
import SideMenu from '../components/SideMenu/SideMenu';
import SideMenuContent from '../components/SideMenuContent/SideMenuContent';
import Header from '../components/Header/Header';
import Wrapper from '../components/Wrapper/Wrapper';
import Loading from '../components/Loading/Loading';

const BaseView = props => (
  <div>
    <SideMenu menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen}>
      <SideMenuContent setMenuOpen={props.setMenuOpen} user={props.user} />
    </SideMenu>
    <Header
      title={props.title}
      setMenuOpen={props.setMenuOpen}
      logout={props.logout}
      promptLogout={props.promptLogout}
    />
    <Wrapper>{props.children}</Wrapper>
    <Loading loading={props.loading} loadingText={props.loadingText} />
  </div>
);

export default BaseView;
