import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import MarkeCoordinates from './MarkeCoordinates'

const CreateAttackForm = () => {
  const [open, setOpen] = useState(false)

  const [nkill, setnkill] = useState<string>('')
  const [nwound, setnwound] = useState<string>('')
  const [city, setcity] = useState<string>('')
  const [iyear, setiyear] = useState<string>('')
  const [gname, setgname] = useState<string>('')
  const [attacktype1_txt, setattacktype1_txt] = useState<string>('')
  const [summary, setsummary] = useState<string>('')
  const [latitude, setlatitude] = useState<number>(0)
  const [longitude, setlongitude] = useState<number>(0)

  const handelSubmit = async () => {
    console.log(form)
  }

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
      <h1>New Attack Form</h1>
      <Button onClick={()=>setOpen(!open)}>Chose Coordinates</Button>
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => {
          setnkill(e.target.value)
        }}
        id='outlined-basic'
        label='Killed'
        variant='outlined'
        type='number'
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setnwound(e.target.value)}
        id='outlined-basic'
        label='Wounded'
        variant='outlined'
        type='number'
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setcity(e.target.value)}
        id='outlined-basic'
        label='City'
        variant='outlined'
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setiyear(e.target.value)}
        id='outlined-basic'
        label='Year'
        variant='outlined'
        type='number'
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setgname(e.target.value)}
        id='outlined-basic'
        label='Organization'
        variant='outlined'
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setattacktype1_txt(e.target.value)}
        id='outlined-basic'
        label='Attack Type'
        variant='outlined'
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setsummary(e.target.value)}
        id='outlined-basic'
        label='Summary'
        variant='outlined'
      />
      <div>
        <Button onClick={handelSubmit}>Submit</Button>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Click on the map to Chose coordinates'}
        </DialogTitle>
        <DialogContent sx={{ height: 500, width: 500 }}>
          <MarkeCoordinates setlatitude={setlatitude} setlongitude={setlongitude} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(!open)} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateAttackForm
