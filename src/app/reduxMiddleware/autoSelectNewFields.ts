import {  createListenerMiddleware } from '@reduxjs/toolkit'
import { insertControl } from '../../features/wizard/WizardSlice'
import { getExtendedUiSchemaWithPath } from '../../features/wizard/WizardSliceSelectors'
import { ContactlessOutlined } from '@mui/icons-material'
import { getAllPathsFromSchema } from '../../utils/uiSchemaHelpers'
import { difference } from 'lodash'

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: insertControl,
  effect: async (action, listenerApi) => {
    //@ts-ignore 
    const prevUISchemaPaths = getAllPathsFromSchema(getExtendedUiSchemaWithPath(listenerApi.getOriginalState())) 
  
    //@ts-ignore
    const uiSchemaPaths = getAllPathsFromSchema(getExtendedUiSchemaWithPath(listenerApi.getState())) 
    const newUiSChema = difference(uiSchemaPaths, prevUISchemaPaths)
    console.log(newUiSChema)

    
  },
})

export default listenerMiddleware