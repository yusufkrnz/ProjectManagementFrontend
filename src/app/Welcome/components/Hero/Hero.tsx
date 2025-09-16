import Link from 'next/link';
import { SystemDiagram } from '../SystemDiagram';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="h-20" />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-36">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Sektör Liderlerinin Arkasındaki Dijital Dönüşüm Gücü
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Bulut tabanlı mimari ve kurumsal düzeyde uzmanlık, ölçeklenebilir, verimli ve kalıcı dijital dönüşüm sağlıyor.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="#contact"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Hadi Konuşalım
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 w-full">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none w-full">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl ring-1 ring-gray-900/10 dark:ring-gray-700/10 overflow-hidden transition-colors duration-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Sistem Katmanları</h3>
                <SystemDiagram />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
