import dayjs from 'dayjs';
import React from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

export interface TimestampProps {
  /** The timestamp, as a dayjs-parseable string. */
  timestamp: string;
}

export default ({ timestamp, ...props }: TimestampProps) => {
  const date = dayjs(timestamp);
  return (
    <OverlayTrigger
      overlay={
        <Tooltip id={`tooltip-timestamp-${timestamp}`}>
          <small>{date.format('MMMM D, YYYY [at] h:mm a')}</small>
        </Tooltip>
      }
    >
      <time {...props} dateTime={date.toISOString()}>
        {date.fromNow()}
      </time>
    </OverlayTrigger>
  );
};
