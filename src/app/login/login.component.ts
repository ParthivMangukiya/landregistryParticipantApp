import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private authenticated = this.appComponent.authenticated;
  private loggedIn = this.appComponent.loggedIn;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private restService: RestService,
              private appComponent: AppComponent,
              private cookieService: CookieService) {
  }

  private availablePenguins;
  private myPenguins;
  private currentUser;

  private buyInProgress = false;
  private boughtPenguin;

  private signUpInProgress = false;

  @ViewChild('signupForm') signupForm;

  private signUp = {
    id: '',
    name: '',
    address: '',
    balance:''
  };

  private CONGAS = ['green', 'blue', 'purple'];

  private congaName;

  ngOnInit() {

    this.loggedIn = this.appComponent.loggedIn;
    this.authenticated = this.appComponent.authenticated;
    if(!this.loggedIn || !this.authenticated){
      this.route
      .queryParams
      .subscribe((queryParams) => {
        const authenticatedParam = queryParams['loggedIn'];
        if(authenticatedParam){
          this.cookieService.set( 'authenticated', 'true' );
        }
        if (authenticatedParam) {
          this.authenticated = true;
          this.appComponent.authenticated = true;
          return this.router.navigate(['/Login'])
            .then(() => {
              return this.checkWallet();
            });
        }
      });
    }
  }

  checkWallet() {
    return this.restService.checkWallet()
      .then((results) => {
        if (results['length'] > 0) {
          this.cookieService.set( 'loggedIn', 'true' );
          this.loggedIn = true;
          this.appComponent.loggedIn = true;
          return this.getCurrentUser()
            .then(() => {
              
            });
        }
      });
  }

  onSignUp() {
    this.signUpInProgress = true;
    return this.restService.signUp(this.signUp)
      .then(() => {
        return this.getCurrentUser();
      })
      .then(() => {
        this.cookieService.set('loggedIn','true');
        this.loggedIn = true;
        this.signUpInProgress = false;
      });
  }

  getCurrentUser() {
    return this.restService.getCurrentUser()
      .then((currentUser) => {
        this.currentUser = currentUser;
        this.appComponent.currentUser = this.currentUser;
        this.cookieService.set('currentUser',this.currentUser);
      });
  }

  // setupDemo(): Promise<any> {
  //   return this.restService.setupDemo().then(() => {
  //     this.getAvailablePenguins();
  //   });
  // }

  // getAvailablePenguins() {
  //   this.availablePenguins = this.restService.getAvailablePenguins();
  // }

  // getMyPenguins() {
  //   this.myPenguins = this.restService.getMyPenguins();
  // }

  // buyPenguin(penguinId) {
  //   this.buyInProgress = true;
  //   this.boughtPenguin = penguinId;
  //   return this.restService.buyPenguin(penguinId, this.currentUser)
  //     .then(() => {
  //       return this.getAvailablePenguins();
  //     })
  //     .then(() => {
  //       return this.getMyPenguins();
  //     })
  //     .then(() => {
  //       this.boughtPenguin = null;
  //       this.buyInProgress = false;
  //     });
  // }

  // private getRandomIntInclusive(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

}
