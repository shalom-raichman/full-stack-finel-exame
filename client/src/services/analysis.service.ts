const BASE_URL = 'http://localhost:1414/'

export const getDeadliestAttackTypes = async (attackType?: string) => {
  try {
    const res = await fetch(`${BASE_URL}api/analysis/deadliest-attack-types/`)
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}