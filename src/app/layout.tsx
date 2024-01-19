import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Image from "next/image";

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="" lang="en">
    <body className={`${montserrat.className}`}>
    <main className="p-[7.5rem]">
      {children}
    </main>
    <Image
      className="absolute bottom-0 z-50 h-auto w-full"
      src="/Vector.png"
      alt=""
      width={1440}
      height={111}
      priority
    />
    <Image
      className="absolute bottom-0 z-50 h-auto w-full"
      src="/Vector2.png"
      alt=""
      width={1440}
      height={111}
      priority
    />
    </body>
    </html>
  )
}
