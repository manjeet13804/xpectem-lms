export interface UploadResult {
  readonly url: string;
  readonly originalName: string;
  readonly mimeType: string;
}

export interface IIsFileValid {
  file: any[];
  maxSize: number;
  availableMimetype: string[];
}
