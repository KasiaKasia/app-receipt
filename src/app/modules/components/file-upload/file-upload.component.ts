import { Component, inject, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { Subscription, finalize } from 'rxjs';
import { FileService } from '../../receipt/service/file/file.service';
import { ClickPosition, Point, Word } from '../../../shared/models/interface-receipt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarAnnotatedComponent } from '../../../shared/components/snack-bar/snack-bar-annotated/snack-bar-annotated.component';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { CharactersSignalsService } from '../../receipt/service/characters/characters-signals.service';
 

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports:[MatIcon,MatProgressBar, NgIf],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent { 
  private charactersSignalsService = inject(CharactersSignalsService)

  @Input( )
  requiredFileType = "image/*";
  uploadProgress = 0;
  uploadSub: Subscription | undefined | null;
  textPosition: any = [{}];
  words: Array<{ word: Word }> = [];
  base64: ArrayBuffer[] = [];
  imageName = ''

  constructor(private fileService: FileService,
              private _snackBar: MatSnackBar) {}

  openSnackBar(word: string) {
    this._snackBar.openFromComponent(SnackBarAnnotatedComponent, {
      duration: 5000,
      data: word
    });
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) { 
      return;
    }


    const fileDate: File = input.files[0];

    if (fileDate) {  
      const formData = new FormData();  
      formData.append('fileDate', fileDate, fileDate.name);

      const upload$ = this.fileService.upload(formData)
      .pipe(
        finalize(() => this.reset())
      );

      this.uploadSub = upload$.subscribe((eventUpload: any) => {
 
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
    this.imageName = file.name;
    reader.onload = () => {      
      this.draw(reader.result, body);
    };
  }
  getPositionClick(event: PointerEvent | MouseEvent): ClickPosition {

    const clickPosition = new Point(event.offsetX, event.offsetY);
    this.words.forEach(listWords => {
      if (listWords.word.isIn(clickPosition)) {
        this.openSnackBar('Kliknięto w słowo ' + listWords.word.value)         
        this.setCharactersSignalsService(listWords.word.value)
      }
    })
    return clickPosition;
  }

  draw(event: any, body: any) {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    this.textPosition = [{}]
    if (ctx) {
      const img = new Image();
      if (body.body && body.body.respons) {
        this.textPosition.push(body.body.respons);

        img.onload = () => {
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img, 0, 0);
          ctx.beginPath();
          const flatRespons = this.textPosition.flat();
          flatRespons.forEach((value: any) => {

            if (value.id >= 1) {

              ctx.beginPath();
              let startx = value.vertices[0].x;
              let starty = value.vertices[0].y;
              let minX = startx;
              let minY = starty;
              let maxX = startx;
              let maxY = starty;
              value.vertices.forEach((vertices: any) => {
                ctx.lineTo(vertices.x, vertices.y);
                if (vertices.x < minX) {
                  minX = vertices.x;
                }
                if (vertices.y < minY) {
                  minY = vertices.y;
                }
                if (vertices.x > maxX) {
                  maxX = vertices.x;
                }
                if (vertices.y > maxY) {
                  maxY = vertices.y;
                }
              });
              const word = new Word(value.description, new Point(minX, minY), new Point(maxX, maxY));
              this.words.push({ word });
              ctx.lineTo(startx, starty);
            }
            ctx.stroke();
          });
        };
      }
      img.src = event;      
      this.base64.push( event as ArrayBuffer);
    }  
  }

  cancelUpload() {
    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
      this.reset();
    }
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = null;
  }
  
  setCharactersSignalsService(value: string) {
    this.charactersSignalsService.setCharacters(value )
  }
}

 