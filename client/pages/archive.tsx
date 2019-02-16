import { default as React } from 'react';
import ArchiveList from '../components/Archive/ArchiveList';
import Layout from '../components/Layout/Layout';
import { getUser } from '../lib/authentication';
import { redirect } from '../lib/routing';

const ArchivePage = () => (
  <Layout>
    <ArchiveList />
  </Layout>
);

ArchivePage.getInitialProps = async ({ req, res }) => {
  const user = await getUser(req);
  if (!user) {
    redirect('/', res);
    return;
  }
};

export default ArchivePage;
