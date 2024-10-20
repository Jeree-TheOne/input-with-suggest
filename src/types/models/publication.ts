export type PublicationTypes = 'company' | 'user'

export type Publication = {
  type: PublicationTypes
  avatar?: string | null
  name?: string | null
  alias: string
}
