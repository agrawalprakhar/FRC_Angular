import { Component } from '@angular/core';
import { RemoteConfigService } from '../remote-config.service';

@Component({
  selector: 'app-button-demo',
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.css']
})
export class ButtonDemoComponent {
  isButtonEnabled = false;

  constructor(private remoteConfigService: RemoteConfigService) { }

  ngOnInit(): void {
    this.updateButtonState();
  }
  
  async updateButtonState() { 
    this.remoteConfigService.getButtonEnabledObservable().subscribe((buttonEnabled: boolean) => {
      console.log('Button Enabled r:', buttonEnabled); 
      this.isButtonEnabled = buttonEnabled; 
    });
    const isButtonEnabled = await this.remoteConfigService.fetchButtonEnabled();
    console.log('Button Enabled:', isButtonEnabled); 
    this.isButtonEnabled = isButtonEnabled;
  }

  
}
