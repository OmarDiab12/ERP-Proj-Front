import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent {
  // البيانات
  @Input() data: any[] = [];

  // تعريف الأعمدة
  @Input() columns: {
    field: string;
    header: string;
    show?: boolean;     // يظهر/يختفي العمود
    type?: 'text' | 'number'| 'status' | 'currency' | 'date' | 'actions' | 'checkbox'| 'image';
    styleClass?: string; // لتغيير لون أو شكل العمود
  }[] = [];

  // إظهار الـ checkbox على اليمين
  @Input() showCheckbox: boolean = false;

  // إظهار العمود الخاص بالإجراءات
  @Input() showActions: boolean = false;
  @Input() showEye: boolean = false;
  @Input() showPencil: boolean = false;
  @Input() showTrash: boolean = false;
  @Input() showDownload: boolean = false;
  @Input() showPagination: boolean = false;
  @Input() pageSize: number = 5;

  // ألوان الحالات (مثال)
  // getStatusClass(status: string) {
  //   switch (status) {
  //     case 'نشط': return 'badge badge-blue';
  //     case 'Sent': return 'badge badge-blue';
  //     case 'مكتمل': return 'badge badge-green';
  //     case 'متأخر': return 'badge badge-red';
  //     default: return 'badge badge-gray';
  //   }
  // }

  /**
   * Return an object with CSS class and label for a status value.
   * Accepts strings (various labels) or boolean (true/false) for flags like `isRepaid`.
   */
  getStatusData(status: any) {
    // boolean-like values: actual boolean or string/number representations
    if (typeof status === 'boolean') {
      return status ? { class: 'badge badge-green', label: 'نعم' } : { class: 'badge badge-red', label: 'لا' };
    }
    if (typeof status === 'string') {
      const s = status.trim().toLowerCase();
      if (s === 'true' || s === '1' || s === 'yes' || s === 'نعم') {
        return { class: 'badge badge-green', label: 'نعم' };
      }
      if (s === 'false' || s === '0' || s === 'no' || s === 'لا') {
        return { class: 'badge badge-red', label: 'لا' };
      }
    }
    if (typeof status === 'number') {
      if (status === 1) return { class: 'badge badge-green', label: 'نعم' };
      if (status === 0) return { class: 'badge badge-red', label: 'لا' };
    }

    // string statuses (existing mappings)
    switch (String(status)) {
      case 'متوفر':
      case 'In Stock':
        return { class: 'badge badge-green', label: 'متوفر' };
      case 'قيد التوريد':
      case 'Pending Delivery':
        return { class: 'badge badge-yellow', label: 'قيد التوريد' };
      case 'منخفض':
      case 'Low Stock':
        return { class: 'badge badge-orange', label: 'منخفض' };
      case 'نفد المخزون':
      case 'Out of Stock':
        return { class: 'badge badge-red', label: 'نفد المخزون' };
      case 'نشط':
        return { class: 'badge badge-blue', label: 'نشط' };
      case 'Sent':
        return { class: 'badge badge-blue', label: 'قيد التقدم' };
      case 'مكتمل':
        return { class: 'badge badge-green', label: 'مكتمل' };
      case 'متأخر':
        return { class: 'badge badge-red', label: 'متأخر' };
      default:
        return { class: 'badge badge-gray', label: status || 'غير معروف' };
    }
  }



  // getStatusClass(status: string): string {
  // switch (status.toLowerCase()) {
  //   case 'active': return 'status-active';
  //   case 'inactive': return 'status-inactive';
  //   case 'pending': return 'status-pending';
  //   default: return '';
  // }
    @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() downlaod = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<{ page: number, pageSize: number }>();

  onView(row: any) { this.view.emit(row); }
  onEdit(row: any) { this.edit.emit(row); }
  onDelete(row: any) { this.delete.emit(row); }
  onDownload(row: any) { this.downlaod.emit(row); }

  getCellClass(col: any, value: any): string {
  // لو عنده function cellStyle
  if (col.cellStyle) {
    return col.cellStyle(value);
  }

  // أو لو عنده styleClass ثابت
  if (col.styleClass) {
    return col.styleClass;
  }

  return '';
}
// getFullImageUrl(relativePath: string): string {
//   if (!relativePath) return 'assets/images/default-avatar.png'; // صورة افتراضية
//   return `https://newerp.runasp.net/${relativePath}`;
// }
getFullImageUrl(imagePath: string): string {
  if (!imagePath) {
    return 'assets/images/default-user.png'; // صورة افتراضية
  }

  // 🟢 ده الـ API base URL بتاعك (غيّره لو مختلف)
  const baseUrl = 'https://newerp.runasp.net/';

  // لو الصورة جاية من السيرفر بدون http أو https
  if (!imagePath.startsWith('http')) {
    return baseUrl + imagePath;
  }

  return imagePath;
}





currentPage: number = 1;
// pageSize: number = 5;

get totalPages(): number {
  return Math.ceil(this.data.length / this.pageSize);
}

get paginatedData() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.data.slice(start, start + this.pageSize);
}

// goToPage(page: number) {
//   if (page >= 1 && page <= this.totalPages) {
//     this.currentPage = page;
//   }
// }
goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.pageChange.emit({ page: this.currentPage, pageSize: this.pageSize });
  }
}
}
