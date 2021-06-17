import React from 'react'
import Link from './Link'
import styles from './App.module.css'

function getPageContent() {
  let envVars = Object.entries(import.meta.env).filter((key) => key[0].startsWith('VITE_'))

  const profilePic = envVars.find((val) => val[0] === 'VITE_PROFILE_PIC')[1]
  const profilePicIndex = envVars.findIndex((val) => val[0] === 'VITE_PROFILE_PIC')

  if (profilePicIndex !== -1) {
    envVars.splice(profilePicIndex, 1)
  }

  const name = envVars.find((val) => val[0] === 'VITE_NAME')[1].replace(/_/g, ' ')
  const nameIndex = envVars.findIndex((val) => val[0] === 'VITE_NAME')

  if (nameIndex !== -1) {
    envVars.splice(nameIndex, 1)
  }

  let links = envVars.map((k) => {
    return [deEnvify(k[0]), k[1]]
  })

  return { name, profilePic, links }
}

function deEnvify(str) {
  return str.replace('VITE_', '').replace('_LINK', '').toLowerCase().split('_').join(' ')
}

function App() {
  let pageContent = getPageContent()
  document.title = `Links by ${pageContent.name}`

  return (
    <div className={styles.App}>
      <img alt={pageContent.name} src={pageContent.profilePic} className={styles.propic} />
      <p>{pageContent.name}</p>
      {pageContent.links.map((l, index) => {
        return <Link key={`link${index}`} name={l[0]} href={l[1]} />
      })}
    </div>
  )
}

export default App
