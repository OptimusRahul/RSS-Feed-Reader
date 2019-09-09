import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, term: any): any {
    if (!value || !term) {
      return value;
    }
    term = term.toLowerCase();
    return value.filter(function(item) {
        return JSON.stringify(item).toLowerCase().includes(term);
    });
  }

}
