import { Component, ElementRef, OnInit} from '@angular/core';

import { StorageService } from '../../providers/storage.service';
import { Permission } from '../../model/permission';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html'

})
export class AppSidebar implements OnInit {

  private menus: string;
  private permission: Permission[];

  constructor(private el: ElementRef, private storageService: StorageService) {

  }

  // wait for the component to render completely
  ngOnInit(): void {
    const rootPermission: Permission = this.storageService.getPermission();
    this.permission = rootPermission.children;
    // this.createMenu(rootPermission);


    const nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);


  }

  public show(code): boolean {
    if (code === 'member') {
      return false;
    }else {
      return true;
    }
  }

  private createMenu(permission: Permission): void {
    this.menus = `
      <li class="nav-item">
        <a  class="nav-link" routerLinkActive="active" [routerLink]="['/dashboard']"><i class="icon-speedometer"></i>首页</a>
      </li>
    `;
    // const children = permission.children;
    // for(let child of children){
    //     console.log(child);
    //     if(child.children && child.children.length != 0){
    //         this.createMenu(child);
    //     }
    // }
  }


}
