import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import { faPlus, faDatabase, faUser } from '@fortawesome/free-solid-svg-icons';
import {WorkSpaceCreateModalComponent} from "../work-space-create-modal/work-space-create-modal.component";

@Component({
  selector: 'app-work-space-dashboard',
  templateUrl: './work-space-dashboard.component.html',
  styleUrls: ['./work-space-dashboard.component.scss']
})
export class WorkSpaceDashboardComponent implements OnInit {

  pageTitle : string = 'My Workspaces'
  view: string = 'card';

  // Icons
  faPlus = faPlus;
  faDatabase = faDatabase;
  faUser = faUser;


  workspaces = [
    {
      name: 'Report-Monthly',
      description: 'Nam eu purus aliquam, imperdiet tellusquis, maximus ligula. Vestibulum…',
      datasource: 3,
      collabator: 3,
      lastupdate: 'July 2, 2021'
    },
    {
      name: 'Report-Monthly',
      description: 'Nam eu purus aliquam, imperdiet tellusquis, maximus ligula. Vestibulum…',
      datasource: 3,
      collabator: 3,
      lastupdate: 'July 2, 2021'
    },
    {
      name: 'Report-Monthly',
      description: 'Nam eu purus aliquam, imperdiet tellusquis, maximus ligula. Vestibulum…',
      datasource: 3,
      collabator: 3,
      lastupdate: 'July 2, 2021'
    },
    {
      name: 'Russia',
      description: 'Nam eu purus aliquam, imperdiet tellusquis, maximus ligula. Vestibulum…',
      datasource: 3,
      collabator: 3,
      lastupdate: 'July 2, 2021'
    }
  ];

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.scrollable = true;
    config.modalDialogClass = 'modal-whole sidebar-right';
    config.keyboard = false;
    config.backdrop = true;
  }

  ngOnInit(): void {
  }

  openModal() {
    console.log('test');
    this.modalService.open(WorkSpaceCreateModalComponent);
  }

}
