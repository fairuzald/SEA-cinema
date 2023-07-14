"use client"
import React, { useState } from 'react'
import CardUpcomingCinema from './CardUpcomingCinema'
import { Movie, User } from '@prisma/client'

const UpcomingSection = ({ data, currentUser }: { data: any, currentUser?: User | null }) => {
  // Slice data will be showed state
  const [preview, setPreview] = useState(5)
  return (
    <section className="w-full flex px-8 lg:px-20 gap-10 flex-col py-10">
      {/* Title Showing Now Cinemas Section */}
      <h2 className="text-red text-2xl lg:text-3xl font-bold text-left">
        Upcoming Movies in Cinemas
      </h2>
      {/* Mapping data card */}
      <div className="w-full sm:px-10 flex gap-10 lg:px-20 lg:gap-20 flex-col">
        {data.slice(0, preview).map((item: Movie, index: number) =>
          index % 2 == 0 ?
            <CardUpcomingCinema data={item} key={item.id} currentUser={currentUser} position="left" /> :
            <CardUpcomingCinema data={item} key={item.id} currentUser={currentUser} position="right" />)
        }
      </div>
      {preview < data.length ?
        // Add functionality to add more card will show
        <button onClick={() => setPreview(preview + 4)}>
          <p className="font-semibold text-xl text-red">Show More</p>
        </button> :
        data.length > 5 &&
        // Add functionality to reduce less card will show
        <button onClick={() => setPreview(5)}>
          <p className="font-semibold text-xl text-red">Show Less</p>
        </button>
      }
    </section>
  )
}

export default UpcomingSection
