import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'

const raleway = Raleway({subsets:['latin'] , weight:['100' , '200' , '300' , '400' , '500' ,'600' , '700' , '800' , '900']})

export const metadata: Metadata = {
  title: {
    default:'Bloger',
    template:"%s - Bloger"
  },
  description: 'Shall we?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={raleway.className}>{children}</body>
    </html>
  )
}
