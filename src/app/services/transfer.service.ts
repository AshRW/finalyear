import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor() { }
  private data_object:any
  private data_list:any=[]
  setObject(incoming:any){
    this.data_object=incoming;
  }
  getObject(){
    return this.data_object;
  }
  setList(incoming:any){
    this.data_list=incoming;
  }
  getList(){
    return this.data_list;
  }
}
