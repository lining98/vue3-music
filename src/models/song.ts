export interface ISongDetail {
  name: string;
  id: number;
  al: songAl;
  picUrl: string;
  [proName: string]: any;
}

interface songAl {
  id: number;
  name: string;
  picUrl: string;
  [proName: string]: any;
}
