"use client"
import React from 'react'

const Button = ({onClick=null, label}) => {
  return (
    <div onClick={() => {
        if(onClick instanceof Function) {
            onClick();
        }
    }}>{label}</div>
  )
}

export default Button