import { Component, OnInit, Input } from '@angular/core';
interface carouselImage{
  imageSrc:string,
  imageAlt:string
}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  @Input() images: carouselImage[]=[];
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() setInterval = 5000;
  selectedIndex=0;
  ngOnInit():void{
    if(this.autoSlide){
      this.autoSlideImage();
    }
  }
  autoSlideImage():void{
    setInterval(()=>{
      this.onNextClick();
    },this.setInterval)
  }
  // set index of image an dot
  selectedImage(index: number): void{
    this.selectedIndex = index;
  }
  onPrevClick():void {
    if(this.selectedIndex ===0){
      this.selectedIndex = this.images.length - 1;
    }else{
      this.selectedIndex--;
    }
  }
  onNextClick():void{
    if(this.selectedIndex === this.images.length - 1){
      this.selectedIndex = 0;
    }else{
      this.selectedIndex++;
    }
  }

}
