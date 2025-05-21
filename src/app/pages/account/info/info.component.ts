import { filter } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{
  constructor(private userService: UserService,private http: HttpClient){}
  @ViewChild(ToastMessageComponent) toastMessageComponent: ToastMessageComponent | undefined;

  ngOnInit(){
    this.getUser();
    this.getDataProvince();
  }
  gender: string | any;
  selectedGender:string|any;
  currentUser:any;
  isShowToast=false;
  getUser(){
    let token = localStorage.getItem('access_token');
    if(!(token == null || token == "")){
      this.currentUser = this.userService.getUserFromToken(token);
      this.userService.getInforUserById(this.currentUser.id).subscribe((data)=>{
        this.currentUser = data;
        this.currentUser.sex == true ? this.gender = 'male' : this.gender = 'female';
        this.selectedGender = this.gender;
      })
    }
  }
  UpdateInfor(){
    this.selectedGender  == "male" ? this.currentUser.sex = 'true' : this.currentUser.sex = 'false';
    this.userService.updateInforUser(this.currentUser.id,this.currentUser).subscribe((data)=>{
      this.returnValue();
      this.isShowToast = true;
      this.toastMessageComponent?.changeH4Content("Cập nhật thành công!",'success',true);
      this.getUser();
    })
  }
  returnValue(){
    setTimeout(() => {
      this.isShowToast = false;
    }, 3000);
  }

  provinces: any[] =[];
  selectedProvince: string = "";
  districts: any[]=[];
  selectedDistrict: string= "";
  wards: any[]=[];
  selectedWard: string= "";

  getDataProvince(){
    this.http.get<any>('../../../../assets/dataProvince/treeVN.min.json').subscribe(data => {
      this.provinces = [...new Set(data.map((item: { city: any; }) => item.city))];
      console.log(this.provinces);
    });
  }
  getDistrictsByCity(cityName: string) {
    this.http.get<any>('../../../../assets/dataProvince/treeVN.min.json').subscribe(data => {
      this.districts = [...new Set(data.filter((item: { city: string; }) => item.city === cityName).map((item: { district: any; }) => item.district)
        )];
      console.log(this.districts);
    });
  }
  getWardsByDistrict(district: string) {
    this.http.get<any>('../../../../assets/dataProvince/treeVN.min.json').subscribe(data => {
      this.wards = [...new Set(data.filter((item: { district: string; }) => item.district === district).map((item: { ward: any; }) => item.ward)
        )];
      console.log(this.wards);
    });
  }
}
