import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { LOAD_WASM, NgxScannerQrcodeService, ScannerQRCodeConfig, ScannerQRCodeResult, ScannerQRCodeSelectedFiles } from 'ngx-scanner-qrcode';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  @ViewChildren('myValue') spans!: QueryList<ElementRef>;

  dataProfe:string | null;

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult1: ScannerQRCodeResult[] = [];
  public result = [];

  public config: ScannerQRCodeConfig = {
    constraints: { 
      video: {
        width: window.innerWidth
      }
    } 
  };

  constructor(public qrcode: NgxScannerQrcodeService){
      this.dataProfe = localStorage.getItem("dataProfeCamera")}


    public onSelects(files: any ) {
      this.qrcode.loadFilesToScan(files, undefined!).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        this.qrCodeResult = res;
        console.log(res)
  
        // Filtra los resultados para obtener solo los valores
      let values1 = this.qrCodeResult.map(item => item.data![0].value);
      console.log(values1)
      localStorage.setItem("dataProfeCamera1",JSON.stringify(values1))
      });
  
    }

    public recogerinfo() {
        this.spans.forEach((span) => {
        let tranfJSON = JSON.parse(span.nativeElement.innerHTML)
        let busqueda = tranfJSON[0].value
        localStorage.setItem("dataProfeCamera",busqueda)
      });
      if (localStorage.getItem("dataProfeCamera") != undefined){
        window.location.href="/asistencias"
      }
    }

  ngOnInit() {}
  }
  
