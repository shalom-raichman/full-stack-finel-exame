interface MyState {
  err: boolean
  loading: boolean
}

export interface AttackTypeModel extends MyState {
  data: {
    attackType: string
    casualties: number
  }[]
}
