import { Component } from '@angular/core';
import { AuthComponent } from "../auth/auth.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
