import { Injectable } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getRemoteConfig, Value, fetchConfig, activate } from 'firebase/remote-config';
import { initializeApp } from 'firebase/app'; // Import Firebase
import { environment } from 'src/environments/environment';
import { getValue } from 'firebase/remote-config';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {
  remoteConfig: RemoteConfig;

  constructor() {
    // Initialize Firebase
    const app = initializeApp(environment.firebaseConfig);

    // Initialize Remote Config
    this.remoteConfig = getRemoteConfig(app);

    this.remoteConfig.settings.minimumFetchIntervalMillis = 0;

   
  }

  async fetchButtonEnabled(): Promise<boolean> {
    
    try {
      // Fetch Remote Config values from the backend
      await fetchConfig(this.remoteConfig);

      const btnEnabledValue: Value = getValue(this.remoteConfig, 'btn');
      // Activate fetched Remote Config values
       await activate(this.remoteConfig);
      
      // Parse the boolean value
      const buttonEnabled: boolean = btnEnabledValue.asBoolean();
      
      // Log the fetched value for debugging
      console.log('Button Enabled:', buttonEnabled);
      
      return buttonEnabled;
    } catch (error) {
      // Log any errors that occur during fetching or parsing
      console.error('Error fetching button enabled value:', error);
      
      // Return false in case of error
      return false; // or return default value
    }
  }
}

 
