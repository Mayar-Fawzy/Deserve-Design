import { Injectable } from '@angular/core';

export interface Project {
  id: number;
  nameEn: string;
  nameAr: string;
  locationEn: string;
  locationAr: string;
  styleEn: string;
  styleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: string;
  images: string[];
  featured?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private projects: Project[] = [
    {
      id: 1,
      nameEn: 'Modern Study Room',
      nameAr: 'غرفة دراسة حديثة',
      locationEn: 'Cairo, Egypt',
      locationAr: 'القاهرة، مصر',
      styleEn: 'Modern',
      styleAr: 'حديث',
      descriptionEn: 'A contemporary study room with rich teal walls, sophisticated lighting, and a blend of modern furniture creating a productive yet stylish workspace.',
      descriptionAr: 'غرفة دراسة معاصرة بجدران زرقاء داكنة وإضاءة أنيقة وأثاث حديث يخلق مساحة عمل منتجة وأنيقة.',
      category: 'modern',
      featured: true,
      images: [
        'asserts/project-1/Screenshot 2026-06-12 191300.png',
        'asserts/project-1/Screenshot 2026-06-12 191312.png',
        'asserts/project-1/Screenshot 2026-06-12 191330.png',
        'asserts/project-1/Screenshot 2026-06-12 191351.png',
      ],
    },
    {
      id: 2,
      nameEn: 'Contemporary Living Space',
      nameAr: 'مساحة معيشة معاصرة',
      locationEn: 'Giza, Egypt',
      locationAr: 'الجيزة، مصر',
      styleEn: 'Contemporary',
      styleAr: 'معاصر',
      descriptionEn: 'An elegant contemporary living space with clean lines and warm tones that bring comfort and sophistication together.',
      descriptionAr: 'مساحة معيشة معاصرة أنيقة بخطوط نظيفة وأنماط دافئة تجمع بين الراحة والأناقة.',
      category: 'contemporary',
      featured: true,
      images: [
        'asserts/project-2/Screenshot 2026-06-12 191219.png',
        'asserts/project-2/Screenshot 2026-06-12 191237.png',
      ],
    },
    {
      id: 3,
      nameEn: 'Luxury Interior Design',
      nameAr: 'تصميم داخلي فاخر',
      locationEn: 'New Cairo, Egypt',
      locationAr: 'القاهرة الجديدة، مصر',
      styleEn: 'Luxury',
      styleAr: 'فاخر',
      descriptionEn: 'A luxurious interior design combining premium materials with sophisticated aesthetics to create a breathtaking living environment.',
      descriptionAr: 'تصميم داخلي فاخر يجمع بين المواد الممتازة والجماليات الراقية لخلق بيئة معيشية مذهلة.',
      category: 'luxury',
      featured: true,
      images: [
        'asserts/Project-3/Screenshot 2026-06-12 191141.png',
        'asserts/Project-3/Screenshot 2026-06-12 191202.png',
      ],
    },
    {
      id: 4,
      nameEn: 'Modern Cafe & Restaurant',
      nameAr: 'مقهى ومطعم حديث',
      locationEn: 'Alexandria, Egypt',
      locationAr: 'الإسكندرية، مصر',
      styleEn: 'Modern',
      styleAr: 'حديث',
      descriptionEn: 'A beautifully designed cafe with natural wood elements, living green walls, and industrial touches creating a warm inviting atmosphere.',
      descriptionAr: 'مقهى مصمم بشكل جميل مع عناصر خشبية طبيعية وجدران خضراء ولمسات صناعية تخلق جوًا دافئًا.',
      category: 'commercial',
      featured: true,
      images: [
        'asserts/project-4/536183983_774877581571402_6968417496406796575_n.jpg',
        'asserts/project-4/537286509_774877514904742_498091145475584983_n.jpg',
        'asserts/project-4/537988834_774877434904750_3255524384328229436_n.jpg',
        'asserts/project-4/Screenshot 2026-06-12 191946.png',
      ],
    },
    {
      id: 5,
      nameEn: 'Elegant Residential Space',
      nameAr: 'مساحة سكنية أنيقة',
      locationEn: 'Cairo, Egypt',
      locationAr: 'القاهرة، مصر',
      styleEn: 'Elegant',
      styleAr: 'أنيق',
      descriptionEn: 'An elegant residential design showcasing the perfect balance between functionality and aesthetic beauty with premium finishes.',
      descriptionAr: 'تصميم سكني أنيق يعرض التوازن المثالي بين الوظيفية والجمال الجمالي مع تشطيبات فاخرة.',
      category: 'apartments',
      featured: false,
      images: [
        'asserts/project-5/469677933_895403349321683_5727812311654359973_n.jpg',
        'asserts/project-5/469799910_895403372655014_1138445927391628117_n.jpg',
        'asserts/project-5/469897908_895403345988350_7947133300905227690_n.jpg',
      ],
    },
  ];

  getAll(): Project[] {
    return this.projects;
  }

  getFeatured(): Project[] {
    return this.projects.filter(p => p.featured).slice(0, 3);
  }

  getByCategory(category: string): Project[] {
    if (category === 'all') return this.projects;
    return this.projects.filter(p => p.category === category);
  }

  getById(id: number): Project | undefined {
    return this.projects.find(p => p.id === id);
  }
}
