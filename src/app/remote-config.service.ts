import { Injectable } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getRemoteConfig, Value, fetchConfig, activate } from 'firebase/remote-config';
import { initializeApp } from 'firebase/app'; // Import Firebase
import { environment } from 'src/environments/environment';
import { getValue } from 'firebase/remote-config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {
  remoteConfig: RemoteConfig;
  buttonEnabledSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 

  constructor() {
    const app = initializeApp(environment.firebaseConfig);

    this.remoteConfig = getRemoteConfig(app);

    this.remoteConfig.settings.minimumFetchIntervalMillis = 0;
 
    setInterval(async () => {
      try {
        await fetchConfig(this.remoteConfig);
        await activate(this.remoteConfig);
        const btnEnabledValue: Value = getValue(this.remoteConfig, 'btn');
        const buttonEnabled: boolean = btnEnabledValue.asBoolean();
        this.buttonEnabledSubject.next(buttonEnabled); 
      } catch (error) {
        console.error('Error fetching or activating Remote Config:', error);
      }
    }, 1000); //fetch after every 1 seconds
  }

  getButtonEnabledObservable() {
    return this.buttonEnabledSubject.asObservable(); 
  }

  async fetchButtonEnabled(): Promise<boolean> {
    try {
      await fetchConfig(this.remoteConfig);
      await activate(this.remoteConfig);

      const btnEnabledValue: Value = getValue(this.remoteConfig, 'btn');
      
      const buttonEnabled: boolean = btnEnabledValue.asBoolean();

      console.log('Button Enabled:', buttonEnabled);

      return buttonEnabled;

    } catch (error) {
      
      console.error('Error fetching button enabled value:', error);
 
      return false; 
    }
  }
}
