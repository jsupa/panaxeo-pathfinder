import { IUser } from '@model/user.model'

export {}

declare global {
  interface String {
    readonly t: string
  }

  namespace Express {
    export interface User extends IUser {}

    interface Response {
      apiAddObject: (key: string, value: any) => void
      apiRender: () => void
      setTemplate: (template: string) => void
      withoutLayout: () => void
      setLocals: (key: string, value: any) => void
      renderino: () => void
    }
  }
}
