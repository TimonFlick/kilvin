import PropTypes from 'prop-types'
import React, { Children, forwardRef } from 'react'
import { useFela } from 'react-fela'

import Spacer from './Spacer'

import applyMultiplier from '../utils/applyMultiplier'
import fillArrayByLength from '../utils/fillArrayByLength'
import arrayifyValue from '../utils/arrayifyValue'

import {
  ruleType,
  responsiveProp,
  responsiveNumberProp,
  responsiveStringProp,
} from '../utils/propTypes'

function renderChildren(
  children,
  spaceType,
  containerElement,
  space,
  direction
) {
  if (spaceType === 'spacer') {
    return Children.toArray(children).map((child, index, arr) => (
      <React.Fragment key={index}>
        {child}
        {index === arr.length - 1 ? null : <Spacer size={space} />}
      </React.Fragment>
    ))
  }

  const dirArr = arrayifyValue(direction)
  const spaceArr = arrayifyValue(space)

  const length = Math.max(dirArr.length, spaceArr.length)
  const filledDir = fillArrayByLength(dirArr, length)
  const filledSpace = fillArrayByLength(spaceArr, length)

  const margins = {
    marginRight: filledDir.map((dir, i) =>
      dir === 'row' || dir === 'row-reverse' ? filledSpace[i] : 0
    ),
    marginBottom: filledDir.map((dir, i) =>
      dir === 'row' || dir === 'row-reverse' ? 0 : filledSpace[i]
    ),
  }

  return Children.toArray(children).map((child, index, arr) =>
    index === arr.length - 1 ? (
      <Box as={containerElement}>{child}</Box>
    ) : (
      <Box as={containerElement} {...margins}>
        {child}
      </Box>
    )
  )
}

const Box = forwardRef(
  (
    {
      children,
      as: As,
      extend,
      style: inlineStyle,
      space,
      spaceType,
      containerElement,
      className,
      padding,
      paddingLeft,
      paddingRight,
      paddingBottom,
      paddingTop,
      margin,
      marginLeft,
      marginRight,
      marginBottom,
      marginTop,
      height,
      width,
      grow,
      shrink,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      order,
      alignContent,
      justifyContent,
      alignItems,
      alignSelf,
      flex,
      basis,
      direction,
      display,
      wrap,
      ...props
    },
    ref
  ) => {
    const { css, theme } = useFela(props)
    const spacing = applyMultiplier(theme.baselineGrid)

    return (
      <As
        {...props}
        style={inlineStyle}
        ref={ref}
        className={css(
          {
            _className: className,
            boxSizing: 'border-box',
            flexDirection: direction,
            flexWrap: wrap,
            flexGrow: grow,
            flexShrink: shrink,
            flexBasis: basis,
            flex,
            justifyContent,
            alignContent,
            alignItems,
            alignSelf,
            order,
            display,
            maxWidth,
            minWidth,
            width,
            maxHeight,
            minHeight,
            height,
            padding: spacing(padding),
            paddingLeft: spacing(paddingLeft),
            paddingRight: spacing(paddingRight),
            paddingBottom: spacing(paddingBottom),
            paddingTop: spacing(paddingTop),
            margin: spacing(margin),
            marginLeft: spacing(marginLeft),
            marginRight: spacing(marginRight),
            marginBottom: spacing(marginBottom),
            marginTop: spacing(marginTop),
          },
          extend
        )}>
        {space
          ? renderChildren(
              children,
              spaceType,
              containerElement,
              space,
              direction
            )
          : children}
      </As>
    )
  }
)

Box.displayName = 'Box'
export default Box

const directionProp = PropTypes.oneOfType([
  PropTypes.arrayOf(
    PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse'])
  ),
  PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),
])

Box.defaultProps = {
  direction: 'column',
  as: 'div',
  grow: 0,
  shrink: 0,
  basis: 'auto',
  display: 'flex',
  alignItems: 'stretch',
  wrap: 'nowrap',
  spaceType: 'spacer',
  containerElement: 'div',
}

Box.propTypes = {
  /** A JSX node */
  children: PropTypes.node,
  /** The HTML node that is rendered. */
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.func,
  ]),
  /** Adds a custom CSS class. */
  className: PropTypes.string,
  /** Extends the Fela style object. */
  extend: PropTypes.oneOfType([ruleType, PropTypes.arrayOf(ruleType)]),
  /** Adds inline styles. */
  style: PropTypes.object,
  /** Adds spacing between children based on the baselineGrid. */
  space: responsiveNumberProp,
  /** Whether spacing is applied using a container or spacer element */
  spaceType: PropTypes.oneOf(['spacer', 'container']),
  /** The component/element that is rendered as a container space */
  containerElement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.func,
  ]),
  /** Adds left padding based on the baselineGrid. */
  paddingLeft: responsiveProp,
  /** Adds right padding based on the baselineGrid. */
  paddingRight: responsiveProp,
  /** Adds bottom padding based on the baselineGrid. */
  paddingBottom: responsiveProp,
  /** Adds top padding based on the baselineGrid. */
  paddingTop: responsiveProp,
  /** Adds padding based on the baselineGrid.<br>Overwritten by specific directional paddings. */
  padding: responsiveProp,
  /** Adds left margin based on the baselineGrid. */
  marginLeft: responsiveProp,
  /** Adds right margin based on the baselineGrid. */
  marginRight: responsiveProp,
  /** Adds bottom margin based on the baselineGrid. */
  marginBottom: responsiveProp,
  /** Adds top margin based on the baselineGrid. */
  marginTop: responsiveProp,
  /** Adds margin based on the baselineGrid.<br>Overwritten by specific directional margins. */
  margin: responsiveProp,
  /** Sets display. */
  display: responsiveStringProp,
  /** Sets flex-wrap. */
  wrap: responsiveStringProp,
  /** Sets the flex-direction. */
  direction: directionProp,
  /** Sets flex-grow. */
  grow: responsiveNumberProp,
  /** Sets flex-shrink. */
  shrink: responsiveNumberProp,
  /** Sets flex-basis. */
  basis: responsiveProp,
  /** Sets order. */
  order: responsiveNumberProp,
  /** Sets flex. */
  flex: responsiveProp,
  /** Sets justify-content. */
  justifyContent: responsiveStringProp,
  /** Sets align-content. */
  alignContent: responsiveStringProp,
  /** Sets align-items. */
  alignItems: responsiveStringProp,
  /** Sets align-self. */
  alignSelf: responsiveStringProp,
  /** Sets max-width. */
  maxWidth: responsiveProp,
  /** Sets min-width. */
  minWidth: responsiveProp,
  /** Sets width. */
  width: responsiveProp,
  /** Sets max-height. */
  maxHeight: responsiveProp,
  /** Sets min-height. */
  minHeight: responsiveProp,
  /** Sets height. */
  height: responsiveProp,
}
