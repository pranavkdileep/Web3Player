import React from 'react'
import { Suspense } from 'react'
import Page from './Home'

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  )
}

export default page