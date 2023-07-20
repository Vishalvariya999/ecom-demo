import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public isSubmited: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {
    this.validationLogin()
  }

  ngOnInit(): void {

  }

  validationLogin() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    })
  }

  get frmControl() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.isSubmited = true
      this.toastrService.error('Please fill all details', 'Error')
    }
    else {
      this.ngxService.start()
      this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password).then((res: any) => {
        if (this.loginForm.value.email === 'admin@gmail.com') {
          localStorage.setItem('role', 'admin')
          this.router.navigate(['/admin/dashboard/home'])
        }
        else {
          localStorage.setItem('role', 'customer')
          localStorage.setItem('email', res.user._delegate.email)
          this.router.navigate(['/customer/dashboard/products'])
        }
        this.ngxService.stop()
        this.toastrService.success("Login Successfully!", 'Success')
      }).catch((err) => {
        this.toastrService.error(err.message, 'Error');
        this.ngxService.stop()
      })
    }
  }
}
