import { AdminDashboardService } from './../../../service/admin-dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-collections',
  templateUrl: './ad-collections.component.html',
  styleUrls: ['./ad-collections.component.css']
})
export class AdCollectionsComponent implements OnInit{
  data: any;

  options: any;

  data1: any;

  options1: any;
constructor( private AdminDashboardService : AdminDashboardService){

}
  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.data = {
          labels: ['Hủy bỏ', 'Đang xử lý', 'Đã xử lý'],
          datasets: [
              {
                  data: [30, 300, 900],
                  backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                  hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
              }
          ]
      };


      this.options = {
          cutout: '60%',
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          }
      };

    this.AdminDashboardService.GetRevenueInMonth(4).subscribe((data)=>{
      let revenueInMonth = data;
      this.data1 = {
        labels: ['Tháng 11','Tháng 12', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
        datasets: [
            {
                label: 'Lợi nhuận',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: [39000000, 28000000, 17000000, 31000000, 36000000, 22000000, revenueInMonth]
            }
        ]
    };
    });

    this.options1 = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }

        }
    };
  }

}

