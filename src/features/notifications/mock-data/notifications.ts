import { TNotification } from '../store/notifications'

export const mockNotifications: TNotification[] = [
  {
    id: 1,
    type: 'success',
    title: 'Replenishment successful',
    message: 'The replenishment of 45.9037438 ETH was successful.',
    date: 1649707295,
    unread: true
  },
  {
    id: 2,
    type: 'error',
    title: 'Replenishment error',
    message: 'An error occurred while adding funds, contact support, or try later.',
    date: 1649707295,
    unread: true
  },
  {
    id: 3,
    type: 'error',
    title: 'KYC error',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: 1649707295,
    unread: true
  },
  {
    id: 4,
    type: 'warning',
    title: 'Support reply',
    message: 'Your appeal has been processed, please check the email.',
    date: 1649707295,
    unread: false
  },
  {
    id: 5,
    type: 'error',
    title: 'Replenishment error',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: 1649707295,
    unread: false
  },
  {
    id: 6,
    type: 'success',
    title: 'Welcome!',
    message: 'Congratulations on successful registration on our site, successful deals!',
    date: 1649707295,
    unread: false
  }
]
