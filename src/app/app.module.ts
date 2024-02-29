import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { ButtonDemoComponent } from './button-demo/button-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonDemoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    initializeApp(environment.firebaseConfig);
  }

}
