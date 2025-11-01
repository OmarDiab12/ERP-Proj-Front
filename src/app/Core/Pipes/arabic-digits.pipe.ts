import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arabicDigits'
})
export class ArabicDigitsPipe implements PipeTransform {

  transform(value: any): string {
    if (value === null || value === undefined) return '';

    // تحويل القيمة إلى نص
    const strValue = value.toString();

    // استبدال الأرقام والفواصل
    return strValue
      .replace(/\d/g, (d: string) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d, 10)]) // الأرقام
      .replace(/,/g, '٬')  // الفاصلة العربية
      .replace(/\./g, '٫'); // الفاصلة العشرية العربية
  }

}


// App.module
// import { ArabicDigitsPipe } from './pipes/arabic-digits.pipe';

// @NgModule({
//   declarations: [
//     ArabicDigitsPipe,
//     // باقي الكومبوننتات...
//   ],
// })
// export class AppModule {}




// <span>{{ row[col.field] | date:'yyyy-MM-dd' | arabicDigits }}</span>
// <span>{{ 'Order #1234, total 1500.75' | arabicDigits }}</span>
// <span>{{ 12345.67 | arabicDigits }} ر.س</span>
