import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectUIElementFromSelection } from '../wizard/WizardSlice'
import { selectSelectedElementJsonSchema } from '../wizard/WizardSliceSelectors'
import useToolSettings from './useToolSettings'

function ToolSettings() {
  const selectedElementJsonSchema = useSelector(selectSelectedElementJsonSchema)
  const UIElementFromSelection = useSelector(selectUIElementFromSelection)
  const { handleChange, toolSettingsJsonSchema, tooldataBuffer } = useToolSettings()
  console.log(toolSettingsJsonSchema)
  return (
    <div>
      {!!toolSettingsJsonSchema && !!tooldataBuffer && (
        <JsonForms
          data={tooldataBuffer}
          schema={toolSettingsJsonSchema}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={handleChange}
        />
      )}
    </div>
  )
}

export default ToolSettings
