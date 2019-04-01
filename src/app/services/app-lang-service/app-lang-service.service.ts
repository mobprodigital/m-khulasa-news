import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AppLangEnum } from 'src/app/enum/app-lang.enum';

@Injectable({
  providedIn: 'root'
})
export class AppLangServiceService {

  constructor(
    private localStgService: LocalStorageService
  ) {
  
  }


  private _selectedAppLang: AppLangEnum = this.localStgService.getData('lang') === AppLangEnum.Hindi ? AppLangEnum.Hindi : AppLangEnum.English;

  public get selectedAppLang(): AppLangEnum {
    return this._selectedAppLang;
  }
  public set selectedAppLang(v: AppLangEnum) {
    this._selectedAppLang = v;
    this.localStgService.setData('lang', v, false);
  }


}
