interface MyState {
  err: boolean
  loading: boolean
}

export interface AttackTypeModel extends MyState {
  data: {
    _id: string
    attackType: string
    casualties: number
  }[]
}

export interface AttackRegionModel extends MyState {
  data: {
    _id: string
    attackRegion: string
    casualties: number
    longitude: number
    latitude: number
  }[]
}
