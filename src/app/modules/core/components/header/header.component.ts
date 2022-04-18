import { Component, OnInit } from '@angular/core';
import { faPlus, faHome, faDatabase, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faPlus = faPlus;
  faHome = faHome;
  faDatabase = faDatabase;
  faUser = faUser;

  constructor() { }

  ngOnInit(): void {
  }

}
