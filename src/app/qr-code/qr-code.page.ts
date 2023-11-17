import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { NgxScannerQrcodeService, ScannerQRCodeConfig, ScannerQRCodeResult, ScannerQRCodeSelectedFiles } from 'ngx-scanner-qrcode';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  @ViewChildren('myValue') spans!: QueryList<ElementRef>;

  dataProfe: string | null;

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

  constructor(public qrcode: NgxScannerQrcodeService, private storage: Storage) {
    this.dataProfe = localStorage.getItem("dataProfeCamera");
  }

  public onSelects(files: any) {
    this.qrcode.loadFilesToScan(files, undefined!).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      this.qrCodeResult = res;
      console.log(res);

      // Filtra los resultados para obtener solo los valores
      let values1 = this.qrCodeResult.map(item => item.data![0].value);
      console.log(values1);
      localStorage.setItem("dataProfeCamera1", JSON.stringify(values1));
    });
  }

  public async recogerinfo() {
    this.spans.forEach((span) => {
      let tranfJSON = JSON.parse(span.nativeElement.innerHTML);
      let busqueda = tranfJSON[0].value;
      localStorage.setItem("dataProfeCamera", busqueda);
    });

    if (localStorage.getItem("dataProfeCamera") != undefined) {
      window.location.href = "/asistencias";
    }

    // Utiliza Ionic Storage para guardar la información
    await this.storage.set("dataProfe", "qrRegistrado");
  }

  async ngOnInit() {
    // Crea la instancia de Ionic Storage
    await this.storage.create();
  }
}
