import { Component, default as React } from 'react';
import ArchiveList from '../components/Archive/ArchiveList';
import Layout from '../components/Layout/Layout';
import client from '../lib/client';

export default () => (
  <Layout>
    <ArchiveList />
  </Layout>
);
