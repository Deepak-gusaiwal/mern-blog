import React from 'react'

const Container = ({className="",children}) => {
  return (
    <div className={`max-w-[1200px] mx-auto p-2 ${className}`}>
      {children}
    </div>
  )
}

export default Container
