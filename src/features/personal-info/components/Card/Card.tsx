import s from './Card.module.scss'

interface ICardProps {
  children: React.ReactNode
  title?: string
  navigation?: React.ReactElement
}

export const Card: React.FC<ICardProps> = ({ children, navigation, title }) => (
  <div className={s.card}>
    {(title || navigation) && (
      <div className={s.titleContainer}>
        <div className={s.title}>{title}</div>
        {navigation}
      </div>
    )}
    {children}
  </div>
)
