import { useState } from 'react'

export const useFiles = () => {
  const [files, setFiles] = useState([])

  return {
    files,
    setFiles,
  }
}
