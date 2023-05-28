import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { LoginPage } = lazyImport(() => import('./Login'), 'LoginPage');
const { RegisterPage } = lazyImport(() => import('./Register'), 'RegisterPage');

export const AuthRoutes = [
  <Route path="/login" element={<LoginPage />} key="login" />,
  <Route path="/register" element={<RegisterPage />} key="register" />,

];
