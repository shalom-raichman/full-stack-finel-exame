import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useRef, useState } from 'react'
import MarkeCoordinates from './MarkeCoordinates'

const CreateAttackForm = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [nkill, setnkill] = useState<string>('')
  const [nwound, setnwound] = useState<string>('')
  const [city, setcity] = useState<string>('')
  const [iyear, setiyear] = useState<string>('')
  const [gname, setgname] = useState<string>('')
  const [attacktype1_txt, setattacktype1_txt] = useState<string>('')
  const [summary, setsummary] = useState<string>('')
  const [latitude, setlatitude] = useState<number>(0)
  const [longitude, setlongitude] = useState<number>(0)

  const form = {
    nkill,
    nwound,
    city,
    iyear,
    latitude,
    longitude,
    gname,
    attacktype1_txt,
    summary,
  }
  return (
    <div className='create-attack-form'>
      <TextField
        onChange={(e) => {
          setnkill(e.target.value)
        }}
        id='outlined-basic'
        label='Killed'
        variant='outlined'
      />
      <TextField
        onChange={(e) => setnwound(e.target.value)}
        id='outlined-basic'
        label='Wounded'
        variant='outlined'
      />
      <TextField
        onChange={(e) => setcity(e.target.value)}
        id='outlined-basic'
        label='City'
        variant='outlined'
      />
      <TextField
        onChange={(e) => setiyear(e.target.value)}
        id='outlined-basic'
        label='Year'
        variant='outlined'
      />
      <TextField
        onChange={(e) => setgname(e.target.value)}
        id='outlined-basic'
        label='Organization'
        variant='outlined'
      />
      <TextField
        onChange={(e) => setattacktype1_txt(e.target.value)}
        id='outlined-basic'
        label='Attack Type'
        variant='outlined'
      />
      <TextField
        onChange={(e) => setsummary(e.target.value)}
        id='outlined-basic'
        label='Summary'
        variant='outlined'
      />
      <Button onClick={handleClickOpen}>Chose Coordinates</Button>
      {JSON.stringify(form)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent sx={{height: 500, width: 500}}>
          <MarkeCoordinates setlatitude={setlatitude} setlongitude={setlongitude} />
          {/* <DialogContentText id='alert-dialog-description'>
            Let Google help apps determine location. This means sending anonymous location
            data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateAttackForm

export interface CreateAttackDTO {
  nkill: number
  nwound: number
  city: string
  iyear: number
  imonth?: number
  latitude: number
  longitude: number
  gname: string
  attacktype1_txt: string
  summary: string
}
