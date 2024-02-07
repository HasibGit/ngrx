import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

const authStateSelector = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
  authStateSelector,
  (auth) => !!auth.user
);
