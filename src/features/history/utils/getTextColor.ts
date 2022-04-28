export const getSideColor = (side: string): string => {
  switch (side) {
    case 'Sell':
      return 'red'
    case 'Buy':
      return 'green'
    default:
      return 'green'
  }
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Partly canceled':
      return 'alert'
    case 'Canceled':
      return 'red'
    case 'Completed':
      return 'green'
    case 'Partly completed':
      return 'blue'
    default:
      return 'green'
  }
}
