import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projectsData: any;
  cashflowData: any;
  revenuesData: any;
  partnersData: any;

  chartOptions: any;
  cashflowOptions: any;
  revenuesOptions: any;
  partnersOptions: any;

  ngOnInit(): void {
    // المشاريع
    this.projectsData = {
      labels: ['نشط', 'مكتمل', 'معلق'],
      datasets: [
        {
          data: [23, 18, 6],
          backgroundColor: ['#FFD700', '#4CAF50', '#999']
        }
      ]
    };

    // التدفق النقدي
    this.cashflowData = {
      labels: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو'],
      datasets: [
        {
          label: 'الإيرادات',
          data: [400000, 200000, 300000, 600000, 800000, 500000, 700000],
          borderColor: '#5D5FEF',
          borderWidth: 2,
          fill: true,
          backgroundColor: 'rgba(0,0,0,0.02)',
          tension: 0.4
        },
        {
          label: 'المصروفات',
          data: [300000, 150000, 400000, 500000, 600000, 400000, 650000],
          borderColor: '#42A5F5',
          borderDash: [5, 5],
          borderWidth: 2,
          fill: false,
          tension: 0.4
        }
      ]
    };


    //     this.cashflowData = {
    //   labels: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو'],
    //   datasets: [
    //     {
    //       label: 'الإيرادات',
    //       data: [400000, 200000, 300000, 600000, 800000, 500000, 700000],
    //       borderColor: '#000',
    //       borderWidth: 2,
    //       fill: true,
    //       backgroundColor: 'rgba(0,0,0,0.05)',
    //       tension: 0.4
    //     }
    //   ]
    // };

    // الإيرادات حسب الفئة
    this.revenuesData = {
      labels: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو'],
      datasets: [
        {
          label: 'الإيرادات',
          backgroundColor: '#92BFFF',
          data: [15000, 25000, 20000, 30000, 28000, 24000],
          borderRadius: 8, // 🔹 يضيف انحناء لأطراف العمود
      borderSkipped: false // 🔹 يخلي كل الزوايا فيها radius مش جهة واحدة بس
        },
        {
          label: 'المصروفات',
          backgroundColor: '#FF5F57',
          data: [10000, 20000, 18000, 25000, 22000, 20000],
          borderRadius: 8, // 🔹 يضيف انحناء لأطراف العمود
      borderSkipped: false // 🔹 يخلي كل الزوايا فيها radius مش جهة واحدة بس
        }
      ]
    };

    // توزيع أرباح الشركاء
    this.partnersData = {
      labels: ['محمد حسن', 'ياسر عماد', 'إيمان السعيدي'],
      datasets: [
        {
          data: [40, 35, 25],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFCE56']
        }
      ]
    };





    // 📌 OPTIONS

    // مشاريع / بارتنرز (عام)
    this.chartOptions = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#000',
            font: { size: 13 }
          }
        }
      }
    };

    // التدفق النقدي
    // this.cashflowOptions = {
    //   responsive: true,
    //   plugins: {
    //     legend: {
    //       position: 'bottom',
    //       labels: {
    //         color: '#000'
    //       }
    //     },
    //     tooltip: {
    //       enabled: true,
    //       backgroundColor: '#000',
    //       titleColor: '#fff',
    //       bodyColor: '#fff'
    //     }
    //   },
    //   scales: {
    //     x: {
    //       grid: { display: false }, // شيل خطوط X
    //       ticks: { color: '#000' }
    //     },
    //     y: {
    //       grid: { display: false }, // شيل خطوط Y
    //       ticks: {
    //         color: '#000',
    //         callback: (value: any) => value / 1000 + 'K'
    //       }
    //     }
    //   }
    // };
    this.cashflowOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false // ❌ إخفاء الإيرادات والمصروفات تحت الرسم
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#000',
          titleColor: '#fff',
          bodyColor: '#fff',
          titleFont: { family: 'Almarai' }, // ✅ فونت عربى للعنوان
          bodyFont: { family: 'Almarai' }   // ✅ فونت عربى للنص
        }
      },
      scales: {
        x: {
          grid: { display: false }, // ❌ شيل خطوط X
          border: { display: false }, // ❌ شيل حدود X
          ticks: { color: '#000', font: { family: 'Almarai' } } // ✅ فونت عربى
        },
        y: {
          grid: { display: false }, // ❌ شيل خطوط Y
          border: { display: false }, // ❌ شيل حدود Y
          ticks: { color: '#000', font: { family: 'Almarai' } } // ✅ فونت عربى
        }
      }
    };

    // الإيرادات حسب الفئة
    this.revenuesOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: '#000', font: {
              family: 'Almarai'
            }
          }
        },
        y: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: '#000', font: {
              family: 'Almarai'
            }
          }
        }
      },
            elements: {
        point: {
          radius: 3,
          backgroundColor: '#8b5cf6'
        }
    }}

    //     this.revenuesOptions = {
    //   responsive: true,
    //   maintainAspectRatio: false, // تقدر تتحكم في الطول والعرض
    //   plugins: {
    //     legend: {
    //       display: false // شيل كلمة الإيرادات
    //     },
    //   },
    //   scales: {
    //     x: {
    //       display: false // شيل الخط الأفقي
    //     },
    //     y: {
    //       display: false // شيل الخط الرأسي
    //     }
    //   },
    //   elements: {
    //     point: {
    //       radius: 3,
    //       backgroundColor: '#8b5cf6'
    //     }
    //   },
    //   layout: {
    //     padding: 10
    //   },
    //   font: {
    //     family: 'Almarai' // الخط العربي
    //   }
    // };

    // أرباح الشركاء
    this.partnersOptions = {
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#000'
          }
        }
      }
    };
  }
}
