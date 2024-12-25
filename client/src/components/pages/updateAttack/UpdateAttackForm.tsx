import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useRef, useState } from 'react'
import { updateNewAttackService } from '../../../services/CRUD.service'
import { CreateAttackDTO } from '../../../types/createAttackDTO'
import MarkeCoordinates from '../newAttack/MarkeCoordinates'

interface Props {
  attack: CreateAttackDTO
}

const UpdateAttackForm = ({ attack }: Props) => {
  const [open, setOpen] = useState(false)

  const [nkill, setnkill] = useState<number>(0)
  const [nwound, setnwound] = useState<number>(0)
  const [city, setcity] = useState<string>('')
  const [iyear, setiyear] = useState<number>(2000)
  const [gname, setgname] = useState<string>('')
  const [attacktype1_txt, setattacktype1_txt] = useState<string>('')
  const [summary, setsummary] = useState<string>('')
  const [latitude, setlatitude] = useState<number>(0)
  const [longitude, setlongitude] = useState<number>(0)

  const form: CreateAttackDTO = {
    _id: attack._id,
    nkill: nkill ? nkill : attack.nkill,
    nwound: nwound ? nwound : attack.nwound,
    city: city ? city : attack.city,
    iyear: iyear ? iyear : attack.iyear,
    latitude: latitude ? latitude : attack.latitude,
    longitude: longitude ? longitude : attack.longitude,
    gname: gname ? gname : attack.gname,
    attacktype1_txt: attacktype1_txt ? attacktype1_txt : attack.attacktype1_txt,
    summary: summary ? summary : attack.summary,
  }

  const response = useRef<CreateAttackDTO>(form)

  const handelSubmit = async () => {
    const { attacktype1_txt, city, gname, longitude } = form
    if (!attacktype1_txt || !city || !gname || !longitude)
      alert('All filds must be be provided')
    const data = await updateNewAttackService(form)
    if(data.err) {
      alert(data.message)
    }else {
      response.current = data.data
      alert(
        `Attack updated`
      )
    }
  }

  return (
    <div className='update-attack-form'>
      <h1>New Attack Form</h1>
      <Button onClick={() => setOpen(!open)}>Chose Coordinates</Button>
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => {
          setnkill(Number(e.target.value))
        }}
        id='outlined-basic'
        label='Killed'
        variant='outlined'
        type='number'
        defaultValue={attack.nkill}
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setnwound(Number(e.target.value))}
        id='outlined-basic'
        label='Wounded'
        variant='outlined'
        type='number'
        defaultValue={attack.nwound}
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setcity(e.target.value)}
        id='outlined-basic'
        label='City'
        variant='outlined'
        defaultValue={attack.city}
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setiyear(Number(e.target.value))}
        id='outlined-basic'
        label='Year'
        variant='outlined'
        type='number'
        defaultValue={attack.iyear}
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setgname(e.target.value)}
        id='outlined-basic'
        label='Organization'
        variant='outlined'
        defaultValue={attack.gname}
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setattacktype1_txt(e.target.value)}
        id='outlined-basic'
        label='Attack Type'
        variant='outlined'
        defaultValue={attack.attacktype1_txt}
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setsummary(e.target.value)}
        id='outlined-basic'
        label='Summary'
        variant='outlined'
        defaultValue={attack.summary}
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

export default UpdateAttackForm
