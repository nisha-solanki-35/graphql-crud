import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'

function SkeletonTable(props) {
  return (
    <Fragment>
      {Array(props.numberOfColumns)
        .fill()
        .map((_data1, index) => (
          <tr key={index}>
            { Array(props.numberOfColumns)
              .fill()
              .map((_data, id) => (
                <td key={id}>
                  <Skeleton width="80%" />
                </td>
              ))}
          </tr>
        ))}
    </Fragment>
  )
}

SkeletonTable.propTypes = {
  numberOfColumns: PropTypes.number.isRequired
}

export default SkeletonTable