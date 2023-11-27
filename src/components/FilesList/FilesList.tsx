import React, { useEffect, useState } from 'react'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { axiosInstance } from '../../api'

const FilesList = () => {
  const [files, setFiles] = useState([])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const configForDelete = {
    params: {
      username: localStorage.getItem('username'),
      fullPath: '123/Лист Microsoft Excel.xlsx',
    },
  }

  const config = {
    params: {
      username: localStorage.getItem('username'),
      folder: '',
    },
  }

  const getUploadFiles = async () => {
    const response = await axiosInstance.get('/getFiles', config)
    console.log(response)
    setFiles(response.data.list)
  }

  useEffect(() => {
    getUploadFiles()
  }, [])

  const handleMenuCloseForDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        '/deleteFile',
        configForDelete,
      )
      console.log(response)
    } catch (error) {
      console.error(error)
    }
    handleClose()
  }

  const dataForRename = {
    username: localStorage.getItem('username'),
    fullPath: '123/',
    oldName: 'Метрология (метода).docx',
    //TODO Нельзя давать пользователю менять расширение файла
    newName: 'Кусок дерьма.docx',
  }
  const handleMenuCloseForRename = async (file: any) => {
    console.log(file)
    try {
      const response = await axiosInstance.put('/renameFile', dataForRename)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
    handleClose()
  }

  const handleMenuClose = () => handleClose()
  if (!files.length) {
    return <div>LOADING...</div>
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableBody>
          {files.map((file: any) => (
            <TableRow
              //Поставить on click и проверить is dir //set files // вызывать функцию
              key={file.name}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                verticalAlign: 'baseline',
              }}
            >
              {file.isDir ? <FolderIcon /> : <PictureAsPdfIcon />}
              <TableCell component='th' scope='row'>
                {file.name}
              </TableCell>
              <TableCell align='left'>{file.username}</TableCell>
              <TableCell align='left'>{file.data}</TableCell>
              {file.isDir !== 'folder' ? (
                <TableCell align='left'>{file.size}</TableCell>
              ) : (
                <TableCell align='left'></TableCell>
              )}
              <TableCell align='right'>
                <IconButton
                  id='basic-button'
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleMenuClose}>Скачать</MenuItem>
                  <MenuItem onClick={() => handleMenuCloseForRename(file)}>
                    Переименовать
                  </MenuItem>
                  <MenuItem onClick={handleMenuCloseForDelete}>
                    Удалить
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export { FilesList }
