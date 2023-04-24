import { FormBuilder, Validators } from '@angular/forms';
import { AdminUserService } from './../../../service/admin-user.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { User } from '../../../api/user';

@Component({
  selector: 'app-ad-coupens',
  templateUrl: './ad-coupens.component.html',
  styleUrls: ['./ad-coupens.component.css'],
  providers: [MessageService],
})
export class AdCoupensComponent implements OnInit{
  MessageService: any;
  ngOnInit(): void {
    this.getAllUser();
    this.items = [
      { label: 'Phân quyền admin', icon: 'pi pi-arrow-up' },
      { label: 'Phân quyền user', icon: 'pi pi-arrow-down' },
      { label: 'Xóa người dùng', icon: 'pi pi-times' },
  ];
  }
  constructor(private adminUserService:AdminUserService, private messageService: MessageService){

  }
  mode=false;
  items: MenuItem[] = [];
  listUser: User[] = [];
  userDialog: boolean = false;
  getAllUser(){
    this.adminUserService.getListUser().subscribe((data)=>{
      this.listUser = data;
    })
  }
  editUser(val:User){
    this.mode = false;
    this.userDialog = true;
    this.user = {...val};
  }
  hideDialog() {
    this.userDialog = false;
  }
  userAfterEdit: any ={};
  user: any ={};
  deleteUserDialog=false;
  deleteUser(user: any) {
    this.deleteUserDialog = true;
    this.user = { ...user };
  }
  confirmDelete() {
    this.deleteUserDialog = false;
    this.listUser = this.listUser.filter((val) => val.id !== this.user.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Bạn vừa xóa thành công một người dùng',
      life: 3000,
    });
    this.user = this.user;
  }
  Save(user:any){
    this.adminUserService.putUser(user).subscribe(()=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Bạn vừa sửa thành công một người dùng',
        life: 3000,
      });
      this.userDialog = false;
      this.getAllUser();
    })
  }
  upgradePermissionDialog=false;
  userTemp:any;
  upgradePermission(val:any){
    this.adminUserService.UpgradePermission(this.userTemp.id).subscribe(()=>{
      this.upgradePermissionDialog=false;
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Bạn vừa phân quyền quản lý cho một người dùng',
        life: 3000,
      });
      this.getAllUser();
    });
  }

}
