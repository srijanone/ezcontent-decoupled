import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() header: Array<any>;
  subMenu: Array<any>;

  constructor() {}

  ngOnInit() {
    this.subMenu =  this.header.filter(function(item) {
      return item.parent != null;
    });
  }

  getParentId(item): any {
    let parentId = item.parent ? item.parent : null;
    let id = parentId ? parentId.match(/:(.*)/g).pop().replace(":", "") : null;
    return id;
  }
}
