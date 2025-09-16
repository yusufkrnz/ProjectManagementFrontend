import Link from 'next/link';

export const CallToAction = () => {
  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl transition-colors duration-200">
            Projelerinizi bugün yönetmeye başlayın
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300 transition-colors duration-200">
            Hemen ücretsiz hesap oluşturun ve takımınızla birlikte daha verimli çalışmaya başlayın. 
            Kredi kartı gerekmez, 14 gün ücretsiz deneme.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/login"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ücretsiz Başla
            </Link>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white transition-colors duration-200">
              Demo İzle <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
