import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus, faPowerOff, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Inavitem } from '../../interface/common';
import { HeaderServiceService } from '../../services/header-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/features/admin/services/product.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public faPowerOff = faPowerOff;
  public cart = faCartPlus;
  public user = faUserCircle
  public navbar!: Inavitem[];
  public product: any;
  public currentlyLogin: any
  public cartIcon: boolean = false
  public profileIcon: boolean = false

  constructor(
    private router: Router,
    private headerService: HeaderServiceService,
    private ngxService: NgxUiLoaderService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.headerService.cartIcon.subscribe((res: any) => {
      this.cartIcon = res
    })
    this.headerService.profileIcon.subscribe((res: any) => {
      this.profileIcon = res
    })
    this.currentlyLogin = localStorage.getItem('email')
    this.productService.getCartProduct().subscribe((res: any) => {
      let allCartItem = res.map((data: any) => {
        return {
          email: data.payload.doc.data().email,
          products: {
            id: data.payload.doc.id,
            ...data.payload.doc.data().products
          }
        }
      })
      this.product = allCartItem.filter((data: any) => {
        if (data.email === this.currentlyLogin) {
          return data
        }
      })
    })

    if (localStorage.getItem('role') === 'admin') {
      this.navbar = [
        {
          data: 'Home',
          link: '/admin/dashboard/home'
        },
        {
          data: 'Categories',
          link: '/admin/dashboard/addCategories'
        },
        {
          data: 'Add Products',
          link: '/admin/dashboard/addProduct'
        },
        {
          data: 'View Order',
          link: '/admin/dashboard/viewAllOrder'
        },
      ]
    }
    else {
      this.navbar = [
        {
          data: 'Home',
          link: '/customer/dashboard/products'
        },
        {
          data: 'Orders',
          link: '/customer/dashboard/orders'
        }
      ]
    }
  }

  gotoProfile() {
    this.ngxService.start()
    this.router.navigate(['/customer/dashboard/showProfile'])
    this.ngxService.stop()
  }

  gotoCart() {
    this.ngxService.start()
    this.router.navigate(['/customer/dashboard/cartItem'])
    this.ngxService.stop()
  }

  onLogout() {
    localStorage.clear()
    this.router.navigate(['/auth/login'])
  }
}

