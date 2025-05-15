'use client'

import { Provider } from 'react-redux'
import { store } from '@/shared/store'
import { ChildrenProp } from '../types'

export function ReduxProvider({ children }: ChildrenProp) {
  return <Provider store={store}>{children}</Provider>
}
