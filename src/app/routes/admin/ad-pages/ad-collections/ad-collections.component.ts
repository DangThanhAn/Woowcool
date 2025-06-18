import { AdminUserService } from './../../../service/admin-user.service';
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

  dataChartPie: any[]= [];
constructor( private AdminDashboardService : AdminDashboardService,private AdminUserService:AdminUserService){

}
  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

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
    this.AdminUserService.GetChartPie().subscribe((res)=>{
      res.forEach((element: { count: any; }) => {
        this.dataChartPie.push(element.count)
      });
      this.data = {
        labels: ['Đã giao hàng','Đã hoàn thành','Đã hủy', 'Đã xác nhận','Đang chờ xử lý'],
        datasets: [
            {
                data: this.dataChartPie,
                backgroundColor: [documentStyle.getPropertyValue('--green-500'),documentStyle.getPropertyValue('--bluegray-500'),documentStyle.getPropertyValue('--red-500'),documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'),documentStyle.getPropertyValue('--bluegray-400'),documentStyle.getPropertyValue('--red-400'),documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400')]
            }
        ]
    };
    })
    this.AdminDashboardService.GetRevenueInMonth(6).subscribe((data)=>{
      let revenueInMonth = data;
      this.data1 = {
        labels: ['Tháng 12','Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
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

