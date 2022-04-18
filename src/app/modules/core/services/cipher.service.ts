import {Injectable} from "@angular/core";
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CipherService {

  private secretKeySpec;
  private ivParameterSpec;

  constructor() {
    this.ivParameterSpec ='$s3aRc#0ptM3d!@%';
    this.secretKeySpec = '$pR0p3LrRD@p%@@%';
  }

  encrypt(text: string) {
    return crypto.AES.encrypt(
      crypto.enc.Utf8.parse(text),
      crypto.enc.Utf8.parse(this.secretKeySpec),
      {
        iv: crypto.enc.Utf8.parse(this.ivParameterSpec),
        mode: crypto.mode.CBC,
        padding: crypto.pad.Pkcs7
      }
    ).toString();
  }


  decrypt(text: string) {
    return crypto.AES.decrypt(
      text,
      crypto.enc.Utf8.parse(this.secretKeySpec),
      {
        iv: crypto.enc.Utf8.parse(this.ivParameterSpec),
        mode: crypto.mode.CBC,
        padding: crypto.pad.Pkcs7
      }
    ).toString(crypto.enc.Utf8);
  }

}
