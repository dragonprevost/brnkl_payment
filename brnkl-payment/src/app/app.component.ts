import { Component } from '@angular/core';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user_name = 'Moby Dick';
  vessel_type = 'newport-30';
  device_id = '123456789';
  no_sub = false;
  current_sub = 'monthly'
  //constructor(private paymentComp: PaymentComponent) { }
}
