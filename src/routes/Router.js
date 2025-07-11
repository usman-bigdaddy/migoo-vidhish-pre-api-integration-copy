import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Reading from "../views/reading/Reading";
import SentenceCompletion from "../views/sentencecompletion/SentenceCompletion";
import Restatements from "../views/restatements/Restatements";
import ListeningTest from "../views/listeningtest/ListeningTest";
import Wordbank from "../views/wordbank/WordBank";
import EnglishTest from "../views/englishtest/EnglishTest";
import Help from "../views/help/Help";
import ForgotPassword from "../views/authentication/ForgotPassword";
import ResetPassword from "../views/authentication/ResetPassword";
import ConfirmEmail from "../views/authentication/ConfirmEmail";
import Plans from "../views/plans/Plans";
import AuthGuard from "../components/authgaurd/AuthGuard";
import PrivacyPolicy from "../views/termsandconditions/ThePrivacyPolicy";
import TermsAndConditions from "../views/termsandconditions/TermsAndConditions";
import GoogleCallback from "../views/authentication/auth/GoogleCallback";
import { element } from "prop-types";
// import { TimerProvider } from '../context/TimerContext';

/* ***Layouts**** */
const FullLayout = lazy(() => import("../layouts/full/FullLayout"));
const BlankLayout = lazy(() => import("../layouts/blank/BlankLayout"));

/* ****Pages***** */
const Dashboard = lazy(() => import("../views/dashboard/Dashboard"));
const Achievements = lazy(() => import("../views/achievements/Achievements"));
const Settings = lazy(() => import("../views/settings/Settings"));
const Leaderboard = lazy(() => import("../views/leaderboard/Leaderboard"));

const SamplePage = lazy(() => import("../views/sample-page/SamplePage"));
const Icons = lazy(() => import("../views/icons/Icons"));
const TypographyPage = lazy(() => import("../views/utilities/TypographyPage"));
const Shadow = lazy(() => import("../views/utilities/Shadow"));
const Error = lazy(() => import("../views/authentication/Error"));
const Register = lazy(() => import("../views/authentication/Register"));
const Login = lazy(() => import("../views/authentication/Login"));

const BasicTable = lazy(() => import("../views/tables/BasicTable"));
const ExAutoComplete = lazy(() =>
  import("../views/form-elements/ExAutoComplete")
);
const ExButton = lazy(() => import("../views/form-elements/ExButton"));
const ExCheckbox = lazy(() => import("../views/form-elements/ExCheckbox"));
const ExRadio = lazy(() => import("../views/form-elements/ExRadio"));
const ExSlider = lazy(() => import("../views/form-elements/ExSlider"));
const ExSwitch = lazy(() => import("../views/form-elements/ExSwitch"));
const FormLayouts = lazy(() => import("../views/form-layouts/FormLayouts"));

const Router = [
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        path: "/",
        element: (
            <FullLayout />
        ),
        children: [
          { index: true, element: <Navigate to="dashboard" /> }, // relative path
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'achievements', element: <Achievements /> },
          { path: 'settings', element: <Settings /> },
          { path: 'leaderboard', element: <Leaderboard /> },
          { path: 'reading', element: <Reading showSubmitButton={true} /> },
          { path: 'sentence-completion', element: <SentenceCompletion showSubmitButton={true} /> },
          { path: 'restatements', element: <Restatements showSubmitButton={true} /> },
          { path: 'listening-test', element: <ListeningTest showSubmitButton={true} /> },
          { path: 'word-bank', element: <Wordbank /> },
          { path: 'english-test', element: <EnglishTest /> },
          { path: 'help', element: <Help /> },
          { path: 'plans', element: <Plans /> },
          { path: 'privacy-policy', element: <PrivacyPolicy /> },
          { path: 'terms-and-conditions', element: <TermsAndConditions /> },
          // { path: 'sample-page', element: <SamplePage /> },
          // { path: 'icons', element: <Icons /> },
          // { path: 'ui/typography', element: <TypographyPage /> },
          // { path: 'ui/shadow', element: <Shadow /> },
          // { path: 'tables/basic-table', element: <BasicTable /> },
          // { path: 'form-layouts', element: <FormLayouts /> },
          // { path: 'form-elements/autocomplete', element: <ExAutoComplete /> },
          // { path: 'form-elements/button', element: <ExButton /> },
          // { path: 'form-elements/checkbox', element: <ExCheckbox /> },
          // { path: 'form-elements/radio', element: <ExRadio /> },
          // { path: 'form-elements/slider', element: <ExSlider /> },
          // { path: 'form-elements/switch', element: <ExSwitch /> },
          { path: '*', element: <Navigate to="/auth/404" /> },
        ]
      }
    ]
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "callback", element: <GoogleCallback /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "confirm-email", element: <ConfirmEmail /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
