import { Loader } from './loader';
import { Storage } from './storage';

declare var initGeetest: any;
declare var $: any;
class Ld {
  public static show() {
    $('#loader321').show();
  }
  public static hide() {
    $('#loader321').hide();
  }
}

export class Captcha {
  public static counter = 0;
  public captchaForm: any;
  private static instance: Captcha;
  
  constructor() {
    if(Captcha.instance)
    {
        throw new Error("Error: Instantiation failed: Use Captcha.getInstance() instead of new.");
    }
  }
  public static getInstance()
  {
      if (Captcha.instance == null)
      {
        Captcha.instance = new Captcha();
      }
      return this.instance;
  }

  public onMessage (event: any) {
    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
          this.captchaForm.hide();
          return false;
      } else {
          this.captchaForm.hide();
          return true;
      }
    }
  } 
}


