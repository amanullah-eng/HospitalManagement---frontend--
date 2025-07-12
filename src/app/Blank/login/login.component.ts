import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
 user: User = new User();
   //user = { username: '', password: '', role: ''};
  message = '';


  constructor(private router: Router, private userService : UserService) { }
  ngOnInit(): void {

  }

roles: string[] = ['AdminPanel', 'Doctor', 'Patient', 'Staff', 'LabPanel'];

  login() {
  this.userService.login(this.user).subscribe({
    next: (res: any) => {
      const role = res.role;
      const username = res.username;
      
         if(this.user.password == res.password){           
            Swal.fire({
              title: "logged in",
              icon: "success",
              draggable: true
            });
         }

      // Store in localStorage if needed
      localStorage.setItem('loggedInUser', res.username);
    localStorage.setItem('userRole', res.role);
    localStorage.setItem('userId', res.id); // For image upload
    this.router.navigate(['/profile']);

      // Navigate by role
      switch (role) {
        case 'AdminPanel':
          this.router.navigate(['/admin']);
          break;

        case 'Doctor':
          this.router.navigate(['/doctorDas']);
          break;

        case 'Patient':
          this.router.navigate(['/patientDas']);
          break;

        case 'LabPanel':
          this.router.navigate(['/labDas']);
          break;

        case 'Staff':
          this.router.navigate(['/staff-dashboard']);
          break;

        default:
          this.router.navigate(['/unauthorized']);
          break;
      }
    },
    error: (err) => {
        Swal.fire({
          title: "login faild",
          icon: "success",
          draggable: true
        });

      console.error(err);
    }
  });
}


}

