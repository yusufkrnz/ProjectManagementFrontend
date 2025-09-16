import React from 'react';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  ClockIcon, 
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  CloudIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Proje Analizi',
    description: 'Detaylı proje raporları ve analitik araçları ile performansınızı takip edin.',
    icon: ChartBarIcon,
  },
  {
    name: 'Takım Yönetimi',
    description: 'Takım üyelerinizi organize edin ve görev dağılımını kolayca yönetin.',
    icon: UserGroupIcon,
  },
  {
    name: 'Zaman Takibi',
    description: 'Görevlerinizin ne kadar sürdüğünü takip edin ve verimliliğinizi artırın.',
    icon: ClockIcon,
  },
  {
    name: 'Güvenli Platform',
    description: 'Verileriniz güvenli bulut altyapısı ile korunur ve yedeklenir.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'İletişim Araçları',
    description: 'Takım içi iletişimi kolaylaştıran entegre mesajlaşma sistemi.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Bulut Senkronizasyonu',
    description: 'Tüm cihazlarınızdan erişim sağlayın ve verileriniz her zaman güncel.',
    icon: CloudIcon,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Özellikler</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl transition-colors duration-200">
            İhtiyacınız olan tüm araçlar tek platformda
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 transition-colors duration-200">
            Modern proje yönetimi deneyimi için tasarlanmış kapsamlı özellik setimiz ile 
            takımınızın potansiyelini ortaya çıkarın.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white transition-colors duration-200">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300 transition-colors duration-200">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
