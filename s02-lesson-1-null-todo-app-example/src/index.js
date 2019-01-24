import './index.sass'
import React from 'react'
import { render } from 'react-dom'
import configureStore from './configureStore.js'
import Root from './components/Root.js'

const store = configureStore()

render(
	<Root store={store} />,
	document.getElementById('root')
)