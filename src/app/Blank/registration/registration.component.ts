import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
       //user: User = new User();
    user = { userCode : '', name : '', username: '', email: '', password: '', confirmPassword : '', userRole: ''  };
    message = '';

  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
   
  }

  register() {
    this.userService.register(this.user).subscribe(() => {

       Swal.fire({
              title: "successful",
              icon: "success",
              draggable: true
            });
          
      this.message = 'Registration successful';
      this.router.navigate(['/login']);
    }, (error: any) => {

      
       Swal.fire({
              title: "failed",
              icon: "success",
              draggable: true
            });
            
      console.error('Registration error: ', error);
      this.message = 'Registration failed';
    });
  }

}

  