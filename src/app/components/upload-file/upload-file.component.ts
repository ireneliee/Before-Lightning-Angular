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

  constructor(
    private messageService: MessageService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  onUpload(event: { files: any }) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });

    this.fileUploadService.uploadFile(this.uploadedFiles);
  }
}
