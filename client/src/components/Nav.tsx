import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useState } from 'react'
import { CiMap } from 'react-icons/ci'
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
            <ListItemText primary='Deadliest Attack Types' />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => {
              handelNavigate('CasualtyRegions')
              handleListItemClick(event, 1)
            }}
          >
            <ListItemIcon>
              <CiMap size={30} />
            </ListItemIcon>
            <ListItemText primary='Highest Casualty Regions' />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => {
              handleListItemClick(event, 2)
              handelNavigate('IncidentTrends')
            }}
          >
            <ListItemIcon>
              <HiOutlineClipboardDocumentList size={30} />
            </ListItemIcon>
            <ListItemText primary='Incident Trends' />
          </ListItemButton>


          <Divider />
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => {
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
