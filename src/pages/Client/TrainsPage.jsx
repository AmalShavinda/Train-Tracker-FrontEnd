import React from 'react'
import NavBar from '../../components/NavBar'
import Trains from '../../components/Trains'

const TrainsPage = () => {
  return (
    <main className="relative">
      <section>
        <NavBar />
      </section>
      <section>
        <Trains />
      </section>
    </main>
  )
}

export default TrainsPage
