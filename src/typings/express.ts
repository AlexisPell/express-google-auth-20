import { Request } from 'express';
export type IRequest = Request & {
  user: any;
};
