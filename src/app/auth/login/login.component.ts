import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../auth.service";
import { noop } from "rxjs";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { login } from "../auth.actions";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      email: ["test@angular-university.io", [Validators.required]],
      password: ["test", [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const formValue = this.form.getRawValue();

    this.auth
      .login(formValue.email, formValue.password)
      .pipe(
        tap((user) => {
          const loginAction = login({ user });
          this.store.dispatch(loginAction);
        })
      )
      .subscribe(noop, () => alert("Login failed"));
  }
}
