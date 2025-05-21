import { AdminDashboardService } from './../../../service/admin-dashboard.service';
import { ProductService } from './../../../../services/product.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../../service/app.layout.service';
// import { ProductService } from '../../../service/product.service';
@Component({
  selector: 'app-ad-dashboard',
  templateUrl: './ad-dashboard.component.html',
  styleUrls: ['./ad-dashboard.component.sass'],
})
export class AdDashboardComponent implements OnInit, OnDestroy {
  items!: MenuItem[];

  products!: Product[];

  chartData: any;

  chartOptions: any;

  subscription!: Subscription;

  Orders: number | any;

  OrderInDay: number | any;

  Revenue: number | any;
  RevenueToday: number | any;

  Customers: number | any;

  Reviews: number | any;

  constructor(
    private ProductService: ProductService,
    private layoutService: LayoutService,
    private AdminDashboardService : AdminDashboardService
  ) {
    this.subscription = this.layoutService.configUpdate$.subscribe(() => {
      this.initChart();
    });
  }

  ngOnInit() {
    this.initChart();
    this.ProductService.GetListFeaturedProducts(10).subscribe((data) => {
      this.products = data;
    });
    this.getDataInfo();
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' },
    ];
  }
  getDataInfo(){
    this.AdminDashboardService.GetOrder().subscribe((data)=>{
      this.Orders = data;
    });
    this.AdminDashboardService.GetOrderInDay().subscribe((data)=>{
      this.OrderInDay = data;
    });
    this.AdminDashboardService.GetCustomer().subscribe((data)=>{
      this.Customers = data;
    });
    this.AdminDashboardService.GetRevenue().subscribe((data)=>{
      this.Revenue = data;
    });
    this.AdminDashboardService.GetRevenueToday().subscribe((data)=>{
      this.RevenueToday = data;
    });
    this.AdminDashboardService.GetReview().subscribe((data)=>{
      this.Reviews = data;
    });
  }
  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    this.AdminDashboardService.GetOrderInMonth(5).subscribe((data)=>{
      let quantityOrderInMonth = data;
      this.AdminDashboardService.GetRevenueInMonth(5).subscribe((data)=>{
        let revenueInMonth = data;
        this.chartData = {
          labels: ['Tháng 11', 'Tháng 12','Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
          datasets: [
            {
              label: 'Doanh thu',
              data: [19456500, 35289000, 15550000, 18025420, 40000000, 10000000, revenueInMonth],
              fill: false,
              backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
              borderColor: documentStyle.getPropertyValue('--bluegray-700'),
              tension: 0.4,
            },
            {
              label: 'Đơn hàng',
              data: [28, 48, 40, 19, 86, 27, quantityOrderInMonth],
              fill: false,
              backgroundColor: documentStyle.getPropertyValue('--green-600'),
              borderColor: documentStyle.getPropertyValue('--green-600'),
              tension: 0.4,
            },
          ],
        };
      })
    })

    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
