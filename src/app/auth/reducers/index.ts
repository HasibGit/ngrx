import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { User } from "../model/user.model";
import { AuthActions } from "../auth-action-types";

export const authFeatureKey = "auth";

export const initialAuthState: AuthState = {
  user: undefined,
};

export interface AuthState {
  user: User;
}

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return { user: action.user };
  }),
  on(AuthActions.logout, (state, action) => {
    return { user: undefined };
  })
);
