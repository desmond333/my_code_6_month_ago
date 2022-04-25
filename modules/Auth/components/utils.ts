import { getRandomId } from 'utils'
import { ICheckBox } from 'common/CheckBox/interface'

export const approveMock: ICheckBox = {
  id: getRandomId(),
  value: 'Потвердить',
  label: '',
  checked: false,
}
