import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  private prefixKey: string = 'ks_';

  public setData(key: string, data: any): void {
    localStorage.setItem(this.prefixKey + key, data);
  }

  public getData(key: string): any;
  public getData(key: string, inJson: boolean): any;
  public getData(key: string, inJson?: boolean): any {
    let localData = localStorage.getItem(this.prefixKey + key);
    if (localData) {
      if (inJson === true) {
        return JSON.parse(localData);
      } else {
        return localData;
      }
    } else {
      return null;
    }
  }

}
