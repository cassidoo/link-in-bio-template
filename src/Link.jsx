import React from 'react'
import styles from './Link.module.css'

function Link({ name, href }) {
  return (
    <a className={styles.Link} href={href}>
      {name}
    </a>
  )
}

export default Link
