import { useEffect, useRef, useState } from 'react'
import { getDeadliestAttackTypes } from '../../services/analysis.service'
import { BarChart } from '@mui/x-charts'
import { AttackTypeModel } from '../../types/state.model'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'

const AttackTypes = () => {
  const initialSatate: AttackTypeModel = {
    err: false,
    data: [],
    loading: false,
  }
  const [attackTypes, setAttackTypes] = useState<AttackTypeModel>(initialSatate)
  const [attacksData, setAttacksData] = useState<typeof initialSatate.data>([])
  useEffect(() => {
    ;(async () => {
      setAttackTypes({ ...attackTypes, loading: true })
      const data = await getDeadliestAttackTypes()
      setAttackTypes({ ...attackTypes, loading: false, data: data.data })
      setAttacksData(data.data)
    })()
  }, [])

  const handelSelect = async (e: any, newValue: any) => {
    const params =
      newValue.length > 0 ? newValue.map((a: any) => a.attackType) : ['any-type']
    console.log(newValue.map((a: any) => a.attackType))
    setAttackTypes({ ...attackTypes, loading: true })
    const data = await getDeadliestAttackTypes(params)
    setAttackTypes({ ...attackTypes, loading: false, data: data.data })
  }

  return (
    <div className='page charts-page'>
      {attackTypes.loading && <CircularProgress className='loading' />}
      <Autocomplete
        size='small'
        multiple
        limitTags={2}
        id='multiple-limit-tags'
        options={attacksData}
        getOptionLabel={(option) => option.attackType}
        renderInput={(params) => (
          <TextField {...params} label='Attack Types' placeholder='most populer' />
        )}
        sx={{ width: '300px' }}
        onChange={(e, v) => handelSelect(e, v)}
      />

      <BarChart
        width={1000}
        height={300}
        series={[
          {
            data: attackTypes.data.map((a) => a.casualties),
            id: 'uvId',
            stack: 'total',
          },
        ]}
        xAxis={[{ data: attackTypes.data.map((a) => a.attackType), scaleType: 'band' }]}
      />
    </div>
  )
}

export default AttackTypes
