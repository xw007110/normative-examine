// system
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// service
import { StorageService } from '../../providers/storage.service';

// model
import { Permission } from '../../model/permission';
import { Admin } from 'app/views/base/admin/model/admin';
import { User } from 'app/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeader implements OnInit {

  private user: User;

  constructor(
    private el: ElementRef,
    private storageService: StorageService,
    private router: Router
  ) { }

  // wait for the component to render completely
  ngOnInit(): void {
    const nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);

    this.initMenu();

    this.user = this.storageService.getUser();

  }

  private initMenu(): void {
    const permission: Permission = this.storageService.getPermission();
    console.log('appHeader');
    console.log(permission);
  }


}
