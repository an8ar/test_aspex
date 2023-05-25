import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { LoginPage } = lazyImport(() => import('./Login'), 'LoginPage');
const { SignUpPage } = lazyImport(() => import('./SignUpPage'), 'SignUpPage');

export const AuthRoutes = [
  <Route path="/login" element={<LoginPage />} key="login" />,
  <Route path="/signup" element={<SignUpPage />} key="signup" />,

];
