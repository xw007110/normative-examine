import { Injectable, Pipe, PipeTransform } from '@angular/core';  


@Pipe({  
name: 'sex'  
})  
@Injectable()  
export class Sex implements PipeTransform {  
  transform(value: any): string {
    if(!value) return value;
    if( value == '1') {
      return '男'
    }
    return  '女'
  }
}  