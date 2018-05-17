import React from 'react';
import PropTypes from 'prop-types';

const OnlineUserCount = ({ count }) => {
  const style = {
    float: 'right',
    margin: '10px'
  }
  // Format 'X user(s) online' as 1->'user', 2,3,4...->'users'
  const userText = 'user' + ((count-1) ? 's' : '');
  return (
    <span style={style}>{count} {userText} online </span>
  )
}

OnlineUserCount.propTypes = {
  count: PropTypes.number
}

export default OnlineUserCount;