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

export interface AttackRegionModel extends MyState {
  data: {
    attackRegion: string
    casualties: number
    longitude: number
    latitude: number
  }[]
}
