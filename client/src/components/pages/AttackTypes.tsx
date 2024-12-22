import { useEffect, useState } from 'react'
import { getDeadliestAttackTypes } from '../../services/analysis.service'
import { BarChart } from '@mui/x-charts'
import { AttackTypeModel } from '../../types/state.model'

const AttackTypes = () => {
  const initialSatate: AttackTypeModel = {
    err: false,
    data: [],
    loading: false,
  }
  const [attackTypes, setAttackTypes] = useState<AttackTypeModel>(initialSatate)
  useEffect(() => {
    ;(async () => {
      setAttackTypes({ ...attackTypes, loading: true })
      const data = await getDeadliestAttackTypes()
      setAttackTypes({ ...attackTypes, loading: false, data: data.data })
    })()
  }, [])

  return (
    <div className='page'>
      <div>{attackTypes.loading ? <div>loading</div> : JSON.stringify(attackTypes)}</div>
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
