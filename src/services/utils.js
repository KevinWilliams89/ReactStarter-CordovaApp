import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const AuthenticatedRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={() => (authenticated ? <Component {...rest} /> : <Redirect to="/login" />)}
  />
);

export const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

export const PropsRoute = ({ component, ...rest }) => (
  <Route {...rest} render={routeProps => renderMergedProps(component, routeProps, rest)} />
);

export const removeKey = (obj, deleteKey) => {
  const clone = Object.assign({}, obj);
  delete clone[deleteKey];
  return clone;
};
