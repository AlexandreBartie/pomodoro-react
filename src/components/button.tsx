import React from 'react'

interface Props {
  text: string
  className?: string
  onClick?: () => void
}

export function Button(props: Props): JSX.Element {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.text}
    </button>
  )
}
