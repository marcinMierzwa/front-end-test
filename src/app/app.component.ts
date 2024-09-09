import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResendConfirmationEmailComponent } from "./pages/resend-confirmation-email/resend-confirmation-email.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResendConfirmationEmailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {

}
