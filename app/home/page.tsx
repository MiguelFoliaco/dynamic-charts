import { Home } from '@/modules/home'
import { validateSession } from '@/utils/validateSession'
import React from 'react'

const Page = async () => {

  await validateSession()

  return (<Home />)
}

export default Page