import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent implements OnInit {
  uploadedFiles: any[] = [];
  fileName?: string;

  constructor(
    private messageService: MessageService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  myUploader(event: Event) {
    console.log("reach");
    console.log(event.target);
    const target = event.target as HTMLInputElement;
    if(target.files == null) console.log("Is null");
    console.log(target?.files?.length);

    if (target.files && target.files.length > 0) {
      console.log(target.files[0].name);
    }
  }
}
