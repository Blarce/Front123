import React from 'react'
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

const rows = [
  {
    type: 'folder',
    icon: 'File Icon WIll be here',
    title: 'Title2222',
    userName: 'Some User',
    createdAd: '13.06.2021',
  },
  {
    type: 'file',
    icon: 'File Icon WIll be here',
    title: 'Title1',
    userName: 'Another user',
    createdAd: '25.02.2022',
    size: '19mb',
  },
  {
    type: 'file',
    icon: 'File Icon WIll be here',
    title: 'Title3',
    userName: 'Some User again',
    createdAd: '15.02.2022',
    size: '19mb',
  },
]

const FilesList = () => {
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
      fullPath: '',
    },
  }

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
    fullPath: '',
    oldName: 'sd.jpg',
    //TODO Нельзя давать пользователю менять расширение файла
    newName: 'sss.jpg',
  }
  const handleMenuCloseForRename = async () => {
    try {
      const response = await axiosInstance.put('/renameFile', dataForRename)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
    handleClose()
  }

  const handleMenuClose = () => handleClose()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableBody>
          {rows.map(({ type, title, icon, size, userName, createdAd }) => (
            <TableRow
              key={title}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                verticalAlign: 'baseline',
              }}
            >
              {type === 'folder' ? <FolderIcon /> : <PictureAsPdfIcon />}
              <TableCell component='th' scope='row'>
                {title}
              </TableCell>
              <TableCell align='left'>{userName}</TableCell>
              <TableCell align='left'>{createdAd}</TableCell>
              {type !== 'folder' ? (
                <TableCell align='left'>{size}</TableCell>
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
                  <MenuItem onClick={handleMenuCloseForRename}>
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
