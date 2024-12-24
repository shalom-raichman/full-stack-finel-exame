import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { CreateAttackDTO } from '../../../types/createAttackDTO'
import { getAttacksPage } from '../../../services/utils.service'
import UpdateAttackForm from './UpdateAttackForm'

const UpdateAttack = () => {
  const [attacks, setAttacks] = useState<CreateAttackDTO[]>()
  const [open, setOpen] = useState(false)
  const currentAttack = useRef<CreateAttackDTO>()

  const getData = async (page: number) => {
    const data = await getAttacksPage(page)
    setAttacks(data.data)
  }

  useEffect(() => {
    getData(1)
  }, [])

  return (
    <div className='page'>
      {/* <Autocomplete
        options={attackRegionsSelect.map((a) => {
          return { label: a.attackRegion }
        })}
        sx={{ width: 300, zIndex: 900, position: 'absolute', right: 10, top: 10 }}
        renderInput={(params) => <TextField {...params} label='Region' />}
        onChange={(e, v) => handelSelect(e, v)}
      /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>_id</TableCell>
              <TableCell align='left'>City</TableCell>
              <TableCell align='left'>Kiiled</TableCell>
              <TableCell align='left'>Wounded</TableCell>
              <TableCell align='left'>Organization</TableCell>
              <TableCell align='left'>Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attacks &&
              attacks.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row._id}
                  </TableCell>
                  <TableCell align='left'>{row.city}</TableCell>
                  <TableCell align='left'>{row.nkill}</TableCell>
                  <TableCell align='left'>{row.nwound}</TableCell>
                  <TableCell align='left'>{row.gname}</TableCell>
                  <TableCell align='left'>
                    {row.summary ? row.summary : 'no summary'}
                  </TableCell>
                  <TableCell align='left'>
                    <Button
                      onClick={() => {
                        currentAttack.current = row
                        setOpen(!open)
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={1500}
        showFirstButton
        showLastButton
        onChange={(e, v) => getData(v.valueOf())}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle>

        <UpdateAttackForm attack={currentAttack.current as CreateAttackDTO} />
        <DialogActions>
          <Button onClick={() => setOpen(!open)}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UpdateAttack
