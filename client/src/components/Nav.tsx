import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useState } from 'react'
import { GiTank } from 'react-icons/gi'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { IoStatsChartOutline } from 'react-icons/io5'
import { TfiAgenda } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index)
  }

  const handelNavigate = (path: string) => {
    navigate(`/${path}`)
  }
  return (
    <div className='nav'>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List component='nav' aria-label='main mailbox folders'>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => {
              handleListItemClick(event, 0)
              handelNavigate('attackTypes')
            }}
          >
            <ListItemIcon>
              <IoStatsChartOutline size={30} />
            </ListItemIcon>
            <ListItemText primary='Attack Types' />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => {
              // heandleAllCharts()
              handleListItemClick(event, 3)
            }}
          >
            <ListItemIcon>
              <IoStatsChartOutline size={30} />
            </ListItemIcon>
            <ListItemText primary='dashboard' />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => {
              // heandleAllOrders()
              handleListItemClick(event, 1)
            }}
          >
            <ListItemIcon>
              <HiOutlineClipboardDocumentList size={30} />
            </ListItemIcon>
            <ListItemText primary='הזמנות' />
          </ListItemButton>

          <Divider />
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => {
              // heandleAllInventory()
              handleListItemClick(event, 2)
            }}
          >
            <ListItemIcon>
              <TfiAgenda size={30} />
            </ListItemIcon>
            <ListItemText primary='מלאי' />
          </ListItemButton>
        </List>
      </Box>
    </div>
  )
}

export default Nav
