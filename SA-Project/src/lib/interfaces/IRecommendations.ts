import { FileError } from 'react-dropzone';

export interface UploadableFile {
    id: number;
    file: File;
    errors: FileError[];
    url?: string;
  }

export interface IRecommendations  {
    rTitle: string,
    rDescription: string,
    recommendationId: string,
    rFiles: UploadableFile[], 
};

  