import './globals.css';

export const metadata = {
  title: 'Girlysheet',
  description: 'Cloud knowledge',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"/>
      </head>
      <body>{children}</body>
    </html>
  )
}
