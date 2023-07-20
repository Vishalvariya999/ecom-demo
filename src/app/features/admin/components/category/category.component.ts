import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPen, faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { query, orderBy } from 'firebase/firestore'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public frmCategories!: FormGroup;
  public isSubmited: boolean = false;
  public faPen = faPen;
  public faTrash = faTrash;
  public triangle = faTriangleExclamation
  public prodCategories: any
  public btnName: string = 'Add Category'
  public confirmId!: string;
  public edit: boolean = false
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private productService: ProductService
  ) {
    this.frmValidation()
  }

  ngOnInit(): void {
    this.getProductCate()
  }

  frmValidation() {
    this.frmCategories = this.fb.group({
      name: ['', Validators.required]
    })
  }

  get frmControl() {
    return this.frmCategories.controls
  }

  getProductCate() {
    this.productService.getProductCate().subscribe((res) => {
      this.prodCategories = res.map((data: any) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data()
        }
      })
    })
  }

  addCategory() {
    if (this.frmCategories.invalid) {
      this.isSubmited = true
      this.toastrService.error('Please fill all details', 'Error')
    }
    else {
      if (this.btnName === 'Add Category') {
        let data = {
          ...this.frmCategories.value,
          dateTime: Date()
        }
        this.productService.addProductCategory(data).then((res: any) => {
          this.frmCategories.reset()
          this.toastrService.success("Recored Added Successfully", 'Success')
          this.isSubmited = false
        }).catch((err: any) => {
          this.toastrService.error(err.message, 'Error')
        })
      }
      else {
        let data = {
          ...this.frmCategories.value,
          dateTime: Date()
        }
        this.productService.updateProductCategory(this.confirmId, data).then((res: any) => {
          this.toastrService.success("Edit Recored Successfully", 'Success')
        })
        this.frmCategories.reset()
        this.btnName = 'Add Category'
        this.edit = false
      }
    }
  }

  editMode(data: any) {
    this.edit = true
    this.confirmId = data.id
    this.frmControl['name'].patchValue(data.name)
    this.btnName = 'Update Category'
  }

  sendId(id: string) {
    this.confirmId = id
  }

  deleteProductCategory() {
    this.productService.deleteProductCategory(this.confirmId).then((res: any) => {
      this, this.toastrService.success('Delete Recored Succesfully', 'Success')
    }).catch((err: any) => {
      this.toastrService.error(err.message, 'Error')
    })
  }
}
