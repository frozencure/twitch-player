export interface Quality {
  bitrate: number;
  codecs: string;
  group: string;
  height: number;
  framerate?: number;
  isDefault: boolean;
  name: string;
  width: number;
}
