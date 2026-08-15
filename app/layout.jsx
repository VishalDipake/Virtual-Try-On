import './globals.css'
import Navbar from '@/components/Navbar'

const appName = process.env.NEXT_PUBLIC_APP_NAME || 'VirtualTryOn'

export const metadata = {
  title: `${appName} | AI Virtual Clothing Try-On`,
  description: 'Upload your photo and garment image to generate virtual try-on results with AI.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  )
}
