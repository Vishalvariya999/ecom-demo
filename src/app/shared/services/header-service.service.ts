import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderServiceService {
  cartIcon = new Subject<boolean>();
  profileIcon = new Subject<boolean>();
  constructor() { }

}
