import type { JsonFormsState, OwnPropsOfRenderer, Scopable, UISchemaElement } from '@jsonforms/core'
import { rankWith, scopeEndsWith } from '@jsonforms/core'

import { Box, Grid } from '@mui/material'
import React, {
  useRef,
  ComponentType,
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { JsonFormsDispatch, withJsonFormsControlProps } from '@jsonforms/react'
import useDropOverWizard from './useDropOverWizard'
import DropTargetFormsPreview from '../features/dragAndDrop/DropTargetFormsPreview'
type EmptyLayoutElementProps = {
  path: string
  elements: UISchemaElement[]
  layoutRendererProps: OwnPropsOfRenderer
}

// const StyledPlaceholderElementBox = styled(Box)(({ theme }) => ({
//   border: `1px dashed blue`,
//   borderRadius: '5px',
//   boxSizing: 'border-box',
//   padding: '2em',
//   margin: '1em',

//   '&:hover': {
//     border: `1px dashed green`,
//   },
// }))
const StyledPlaceholderElementBox = ({ children }) => {
  return (
    <Box
      sx={{
        border: `1px dashed gray`,
        borderRadius: '5px',
        boxSizing: 'border-box',
        padding: '1em 2em',
        margin: '1em',
        '&:hover': {
          border: `1px dashed green`,
        },
      }}
    >
      {children}
    </Box>
  )
}

function HorizontalLayoutElementWithPlaceholder({ path, elements, layoutRendererProps }: EmptyLayoutElementProps) {
  // const first = useRef(null)
  const { draggedMeta, isOver, isOverCurrent } = useDropOverWizard({ path })
  const { schema, enabled, renderers, cells } = layoutRendererProps
  return (
    <Box>
      <Grid container direction={'row'} sx={{ minWidth: 100, minHeight: 100 }}>
        {[0, 1].map((index) =>
          elements && !!elements[index] ? (
            <Grid item xs>
              <JsonFormsDispatch
                uischema={elements[index]}
                schema={schema}
                path={path}
                enabled={enabled}
                renderers={renderers}
                cells={cells}
              />
            </Grid>
          ) : (
            <Grid item xs>
              <StyledPlaceholderElementBox>
                {isOver && isOverCurrent && draggedMeta ? (
                  <DropTargetFormsPreview metadata={draggedMeta} />
                ) : (
                  'placeholder'
                )}
              </StyledPlaceholderElementBox>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  )
}
export default HorizontalLayoutElementWithPlaceholder

// export default withJsonFormsControlProps(EmptyHorizontalLayoutElement)

// export const emptyHorizontalLayoutTester = rankWith(1, scopeEndsWith('EmptyHorizontalLayout'))