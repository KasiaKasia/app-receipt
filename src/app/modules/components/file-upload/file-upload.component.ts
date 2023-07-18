import { Component, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription, finalize } from 'rxjs';
import { FileService } from '../../receipt/service/file/file.service';
import { ClickPosition } from 'src/app/shared/models/interface-receipt';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input()
  requiredFileType: string = '';

  fileName = '';
  uploadProgress: number | undefined | null;
  uploadSub: Subscription | undefined | null;
  constructor(private http: HttpClient,
    private fileService: FileService) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file: File = input.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      const upload$ = this.fileService.upload(formData).pipe(
        finalize(() => this.reset())
      );

      this.uploadSub = upload$.subscribe((eventUpload) => {
        this.handleUpload(event, eventUpload);
        if (eventUpload && eventUpload.type == HttpEventType.UploadProgress && eventUpload.total) {
          this.uploadProgress = Math.round(100 * (eventUpload.loaded / eventUpload.total));
        }
      })
    }
  }

  handleUpload(event: Event, body: any) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.draw(reader.result, body)
    };
  }
  getPositionClick(event: PointerEvent | MouseEvent): ClickPosition {
    
    const clickPosition = {
      x: event.offsetX,
      y: event.offsetY
    }
    return clickPosition;
  }

  draw(event: any, body: any) {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const respons = [{}]
    if (ctx) {
      const img = new Image();
      console.log('body ', body);
      if (body.body.respons) {
        respons.push(body.body.respons);

        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          ctx.beginPath();

          const flatRespons = respons.flat()
          flatRespons.forEach((value: any) => {

            if (value.id >= 1) {
              ctx.beginPath();
              let startx = value.vertices[0].x;
              let starty = value.vertices[0].y;
              value.vertices.forEach((vertices: any) => {
                ctx.lineTo(vertices.x, vertices.y);
              })
              ctx.lineTo(startx, starty);
            }
            ctx.stroke();
          })
        };
      }
      img.src = event;
    }
  }

  cancelUpload() {
    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
      this.reset();
    }
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
