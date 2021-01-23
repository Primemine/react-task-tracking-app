import Button from './Button'
import React from 'react'


const Header = ({onAddTask})=>{
  return(
    <header className='header'>
     <h1 style={ headingStyle }>Task Tracker</h1>
     <Button  color='red' title='Add' onClick={ onAddTask } />
    </header>
  )
}

//css
const headingStyle = {
 //css style goes here...
}
export default Header