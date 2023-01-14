import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-app';
  

  constructor(private router: Router) {}

  ngOnInit(){

    const credentials = {
      userId : localStorage.getItem("id"),
      access_token : localStorage.getItem("access_token")
    }

    if(credentials.userId && credentials.access_token){
      this.router.navigateByUrl('/profile');
    } else {
      this.router.navigateByUrl('/login');
    }

  }
}
