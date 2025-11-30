<template>
  <div class="bg-white dark:bg-[#020618]">
    <div class="relative isolate">
      <!-- effects -->
      <svg class="absolute inset-x-0 top-0 -z-10 h-256 w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-gray-200 dark:stroke-white/10" aria-hidden="true">
        <defs>
          <pattern id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-gray-50 dark:fill-gray-800">
          <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" />
        </svg>
        <rect width="100%" height="100%" stroke-width="0" fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
      </svg>
      <div class="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48" aria-hidden="true">
        <div class="aspect-801/1036 w-200.25 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)"></div>
      </div>
      <!-- content -->
      <div class="overflow-hidden">
        <div class="mx-auto max-w-7xl px-6 pt-12 pb-32 sm:pt-12 lg:px-8 lg:pt-32">
          <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <!-- content -->
            <div class="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-3xl">
              <UPageHero
                description="Use nossa busca inteligente para encontrar empregos em todo o Brasil. "
                :ui="{
                  container: 'gap-16 sm:gap-y-8',
                  title: 'lg:text-left text-3xl',
                  description: 'lg:text-left'
                }"
              >
                <template #title>
                  O proximo passo da sua <span class="text-primary">carreira</span> está aqui
                </template>
                <div class="flex items-center gap-x-6">
                  <SearchBar />
                </div>
              </UPageHero>
            </div>
            <!-- images -->
            <div class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
              <div class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-0 xl:pt-80">
                <div class="relative">
                  <img src="/hero1.jpg" alt="" class="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5" />
                  <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                </div>
              </div>

              <div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                <div class="relative">
                  <img src="/hero2.jpg" alt="" class="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5" />
                  <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                </div>
                <div class="relative">
                  <img src="/hero3.jpg" alt="" class="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5" />
                  <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                </div>
              </div>

              <div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <div class="relative">
                  <img src="/hero4.jpg" alt="" class="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5" />
                  <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                </div>
                <div class="relative">
                  <img src="/hero5.jpg" alt="" class="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5" />
                  <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
