import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import type { ReactNode } from 'react'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Movie List',
    default: 'Movie List',
  },
  description: 'App for creating a list of movies',
  metadataBase: new URL('https://movie-list-gray-tau.vercel.app'),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="text-[12px] sm:text-[16px]" lang="en">
      <body
        className={`flex min-h-screen flex-col pt-30 sm:overscroll-y-none ${montserrat.className} antialiased`}
      >
        <main className="flex flex-1 flex-col items-center justify-center px-6 md:px-12 lg:px-30">
          {children}
        </main>
        <footer className="relative inset-y-0 z-50 h-40 w-full">
          <Image
            className="absolute bottom-0 w-full"
            src="/images/Vector.png"
            alt=""
            width={1440}
            height={111}
            priority
          />
          <Image
            className="absolute bottom-0 w-full"
            src="/images/Vector2.png"
            alt=""
            width={1440}
            height={111}
            priority
          />
        </footer>
      </body>
    </html>
  )
}
