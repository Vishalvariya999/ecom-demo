import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signForm!: FormGroup;
  public isSubmited: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.validationLogin();
  }

  ngOnInit(): void {}

  validationLogin() {
    this.signForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      address: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  get frmControl() {
    return this.signForm.controls;
  }

  onSignup() {
    if (this.signForm.invalid) {
      this.isSubmited = true;
      this.toastrService.error('Please fill all details', 'Error');
    } else {
      this.authService
        .signUp(this.signForm.value.email, this.signForm.value.password)
        .then((res: any) => {
          this.authService.addUser({
            ...this.signForm.value,
            role: 'customer',
            // role: 'admin',
          });
          this.router.navigate(['']);
          this.toastrService.success('Recored insert successfully!', 'Success');
        })
        .catch((err) => {
          this.toastrService.error(err.message, 'Error');
        });
    }
  }

  alphabateNotallowed(data: any): void {
    if (data.keyCode >= 65 && data.keyCode <= 96) {
      data.prevantDefault();
    } else if (data.keyCode >= 97 && data.keyCode <= 122) {
      data.prevantDefault();
    } else if (data.keyCode == 42 && 43 && 45 && 47) {
      data.prevantDefault();
    }
  }
}
