import React from 'react'
import NavBar from '../../components/NavBar'
import Trains from '../../components/Trains'
import Footer from '../../components/Footer'

const TrainsPage = () => {
  return (
    <main className="relative">
      <section>
        <NavBar />
      </section>
      <section>
        <Trains />
      </section>
      <section className='mt-10'>
        <Footer />
      </section>
    </main>
  )
}

export default TrainsPage
