import { UPDATE } from './languageConsts'

export const updateLanguage = (language) => {
  return {
    type: UPDATE,
    payload: language
  }
}