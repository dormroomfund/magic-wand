import { Subscribe, Container } from 'unstated';
import { ComponentType } from 'react';

export const withUnstated = <TProps extends {}>(
  Component: ComponentType<TProps>,
  containers: Container<any>[]
) => (props: TProps) => {
 return (
  <Subscribe> // to={[...Object.values(containers)]}>
    {function (...values: Container<any>[]) {
      // const stores = Object.keys(containers).reduce((acc, key, i) => {
      //   acc[key] = values[i];
      //   return acc;
      // }, {});

      return <Component {...props} {...stores} />;
    }}
  </Subscribe>
)};
