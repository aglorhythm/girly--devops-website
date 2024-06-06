//import { getDictionary } from '/lib/dictionaries';
import Hero from '/components/Hero/Hero';

export async function generateMetadata({ params }) {
  //const dict = await getDictionary('en')
  //const metadata = dict.home.metadata
  
  return {
      generator: 'Girlysheet',
      title: 'Girlysheet', 
      description: 'Coming soon'
  }
}

export default async function Home({params}) {
  return (
      <main className="">
        <Hero />
      </main>
  )
}


