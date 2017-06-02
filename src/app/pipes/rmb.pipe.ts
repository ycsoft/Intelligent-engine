import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rmb'
})
export class RmbPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return '￥' + value;
  }

}
