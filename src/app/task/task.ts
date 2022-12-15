import { OnInit } from '@angular/core';

export interface TaskInterface {
  id?: number;
  title?: string;
  description?: string;
  deadline?: Date;
  completed?: boolean;
  archived?: boolean;
  created?: Date;
  updated?: Date;
}

export class Task implements TaskInterface {
  id?: number;
  title?: string;
  description?: string;
  deadline?: Date;
  completed?: boolean;
  archived?: boolean;
  created?: Date;
  updated?: Date;
  constructor() {}
}
