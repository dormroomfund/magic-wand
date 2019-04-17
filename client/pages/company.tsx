import _ from 'lodash';
import { NextContext } from 'next';
import React from 'react';
import CompanyProfile from '../components/CompanyProfile/CompanyProfile';
import FullWidthLayout from '../components/Layout/FullWidthLayout';
import {
  ApplicationContainerProps,
  withAC,
} from '../containers/ApplicationContainer';
import { requireLoggedIn } from '../lib/routing';

interface CompanyProps {
  id: number;
}

class CompanyPage extends React.Component<
  CompanyProps & ApplicationContainerProps
> {
  static async getInitialProps(ctx: NextContext) {
    requireLoggedIn()(ctx);
    const id = _.castArray(ctx.query.id).join('');

    return { id: parseInt(id, 10) };
  }

  render() {
    // TODO: Fancier loading screen.
    const { id } = this.props;

    return (
      <FullWidthLayout>
        {this.props.id ? <CompanyProfile companyId={id} /> : 'Error'}
      </FullWidthLayout>
    );
  }
}

export default CompanyPage;
