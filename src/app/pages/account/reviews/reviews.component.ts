import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  @ViewChild(ToastMessageComponent) toastMessageComponent: ToastMessageComponent | undefined;
  constructor(private UserService:UserService) {}
  ngOnInit(): void {
    this.getUser();
    this.getReviewById();
  }
  currentUser: any;
  getUser() {
    let token = localStorage.getItem('access_token');
    if (!(token == null || token == '')) {
      this.currentUser = this.UserService.getUserFromToken(token);
    }
  }
  listReview:any[]=[];
  getReviewById(){
    this.UserService.getReviewById(this.currentUser.Id).subscribe((data:any)=>{
      this.listReview = data;
    });
  }
  isShow:boolean=false;
  isShowToast:boolean=false;
  ratingStar:string ="";
  contentCommend:string ="";
  myComment = {
    reviewId: 0,
    productId: 0,
    userId:0,
    rating: this.ratingStar = "",
    comment: this.contentCommend = "data.comment",
    createdDate: "",
  };


  editReview(data:any){
    this.isShow = true;
    let currentDate = new Date();
    let isoDate = currentDate.toISOString();
    this.ratingStar = data.rating,
    this.contentCommend = data.comment,

    this.myComment = {
      reviewId: data.reviewId,
      productId: data.productId,
      userId: data.userId,
      rating: this.ratingStar,
      comment: this.contentCommend,
      createdDate: isoDate,
    };
  }
  returnValue(){
    setTimeout(() => {
      this.isShowToast = false;
    }, 3000);
  }
  updateReview(){
    this.myComment.rating = this.ratingStar;
    this.myComment.comment = this.contentCommend;
    this.UserService.editReviewById(this.myComment.reviewId,this.myComment).subscribe(()=>{
      this.isShow = false;
      this.returnValue();
      this.isShowToast = true;
      this.toastMessageComponent?.changeH4Content("Sửa thành công",'',false);
      this.getReviewById();
    })
  }
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('close-popup')) {
      this.isShow = false;
    }
  }
}
