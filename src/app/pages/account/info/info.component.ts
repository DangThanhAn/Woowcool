import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{
  constructor(private userService: UserService,private http: HttpClient){}

  ngOnInit(){
    this.getUser();
    this.getDataProvince();
  }
  gender: string | any;
  selectedGender:string|any;
  currentUser:any;
  getUser(){
    let token = localStorage.getItem('access_token');
    if(!(token == null || token == "")){
      this.currentUser = this.userService.getUserFromToken(token);
      this.currentUser.Sex == "True" ? this.gender = 'male' : this.gender = 'female';
      this.selectedGender = this.gender;
    }
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
