module.exports = {
  locales: ['en'],
  defaultLocale: 'en',
  logBuild: false,
  pages: {
    '*': ['common', 'inputs', 'validation', 'sidebar', 'error'],
    '/': ['home'],
    '/about-us': ['about-us'],
    '/contact-us': ['contact-us'],
    '/questions': ['questions'],
    '/cabinet/personal-info': ['personal-info', 'open-orders'],
    '/cabinet/security': ['security', 'auth'],
    '/cabinet/support': ['support'],
    '/cabinet/open-orders': ['open-orders'],
    '/cabinet/deactivation': ['deactivation'],
    '/sign-in': ['auth'],
    '/sign-up': ['auth', 'date'],
    '/recovery-password': ['auth'],
    '/cabinet/kyc': ['kyc'],
    '/cabinet/wallet': ['wallet', 'kyc', 'notifications'],
    '/cabinet/notifications': ['notifications'],
    '/market': ['market'],
    '/cabinet/history': ['history']
  }
}
