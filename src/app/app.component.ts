/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, AfterViewInit } from '@angular/core';
import $ from 'jquery';
import { RestService } from './rest.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private LOGO:string = 'svnit.png';
  title = 'app works!';
  loggedIn = false;
  authenticated = false;
  currentUser = '';
  myId = '';
  constructor(private cookieService: CookieService,private router: Router) {
  }
  ngAfterViewInit() {
    $('.nav a').on('click', function(){
      $('.nav').find('.active').removeClass('active');
      $(this).parent().addClass('active');
    });

    $('.dropdown').on('show.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('.dropdown').on('hide.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });

    $('.dropdown-menu li').on('click', function(){
      $(this).parent().parent().addClass('active');
    });

    this.loggedIn = (this.cookieService.get('loggedIn') === 'true');
    this.authenticated = (this.cookieService.get('authenticated') === 'true');
    this.currentUser = this.cookieService.get('currentUser');
    // this.cookieService.set( 'Test', 'Hello World' );
    // this.cookieValue = this.cookieService.get('Test');
  }
  LogOut(){
    this.loggedIn=false;
    this.authenticated=false;
    this.currentUser='';
    this.cookieService.delete('loggedIn');
    this.cookieService.delete('authenticated');
    this.cookieService.delete('currentUser');
    this.router.navigate(['/Login']);
  }
}
