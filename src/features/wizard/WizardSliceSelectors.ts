import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

import { extendUiSchemaWithPath } from '../../utils/uiSchemaHelpers'

export const selectJsonSchema = (state: RootState) => state.jsonFormsEdit.jsonSchema
export const selectUiSchema = (state: RootState) => state.jsonFormsEdit.uiSchema

export const selectSelectedElementKey = (state: RootState) => state.jsonFormsEdit.selectedElementKey

const selectSelectedElementJsonSchema = createSelector(
  selectJsonSchema,
  selectSelectedElementKey,
  (jsonSchema, selectedElementKey) => {
    if (!selectedElementKey) {
      return null
    }
    const selectedElement = getJsonSchemaByPath(jsonSchema, selectedElementKey)

    return selectedElement
  }
)



const getExtendedUiSchemaWithPath = createSelector(
  selectUiSchema,
  (uiSchema) => extendUiSchemaWithPath(uiSchema)
)


export { selectSelectedElementJsonSchema, getExtendedUiSchemaWithPath }

function getJsonSchemaByPath(jsonSchema, path) {
  const pathArray = path.split('.')
  const selectedElement = pathArray.reduce((prev, key) => {

    if (prev?.type === 'object' && prev.properties && prev.properties[key]) {
      return prev.properties[key]
    }
    return null
  }, jsonSchema)
  return selectedElement
}


