
const BASE_URL = 'http://localhost:1414/'

export const getAttacksPage = async (page: number) => {
  try {
    const res = await fetch(
      `${BASE_URL}api/crud/${JSON.stringify(page)}`
    )
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
