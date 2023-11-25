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
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
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
