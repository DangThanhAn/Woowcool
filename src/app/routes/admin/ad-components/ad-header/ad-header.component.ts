import { Component, Input, HostListener, OnInit } from '@angular/core';
import { languages, userItems,notifications } from './header.language.data';
@Component({
  selector: 'app-ad-header',
  templateUrl: './ad-header.component.html',
  styleUrls: ['./ad-header.component.css']
})
export class AdHeaderComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  canShowSearch = false;
  selectedLanguage : any;
  languages = languages;
  notifications = notifications;
  userItems = userItems;
  @HostListener('window:resize',['$event'])
  onResize(event: any){
    this.checkCanShowSearch(window.innerWidth);
  }

  ngOnInit(){
    this.checkCanShowSearch(window.innerWidth);
    this.selectedLanguage = this.languages[1];
  }
  checkCanShowSearch(innerWidth:number):void{
    if(innerWidth < 845){
      this.canShowSearch = true;
    }else{
      this.canShowSearch = false;
    }
  }

  getHeadClass():string{
    let styleClass ='';
    if(this.collapsed && this.screenWidth > 768){
      styleClass ='has-trimmed';
    }else{
      styleClass ='head-md-screen';
    }
    return styleClass;
  }
}
