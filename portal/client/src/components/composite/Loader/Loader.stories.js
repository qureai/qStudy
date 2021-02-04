import React from 'react'
import LoaderComponent from './index'

export default {
  title: 'Composite/Loader',
  component: LoaderComponent
}

export const NormalMode = () => (<LoaderComponent/>)

export const DarkMode = () => (<LoaderComponent hasDarkMode/>)
