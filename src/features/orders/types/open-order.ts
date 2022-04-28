export interface IOpenOrder {
  time: Date
  pair: string
  account: string
  type: string
  side: boolean
  price: number
  fee: number
  volume: number
  filled: number
  total: number
  id: string
}
