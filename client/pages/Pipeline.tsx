import React, {PureComponent} from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

import Layout from '../components/Layout/Layout';
import Column from '../components/Column';
import transformData from './utils';

const AppContainer = styled.div`
  display: flex;
`;

interface PipelineProps {
  state: any,
}

interface PipelineState {
  loading: boolean,
  columns: any,
  companies: any
  columnOrder: any
}

const config = {
  headers: {'Access-Control-Allow-Origin': '*'}
};

export default class Pipeline extends PureComponent<
  PipelineProps,
  PipelineState> {

  state = {
    loading: true,
    columns: [],
    companies: [],
    columnOrder: []
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/api/companies', config)
      .then((response) => {
        console.log(response);
        const ret = transformData(response.data.data);
        console.log(ret);
        // this.setState({ columnOrder: ret.columnOrder,
        //                 columns: ret.columns,
        //                 companies: ret.companies,
        //                 loading: false });
      });
    // .catch(error => {
    //   console.log(error);
    // });
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const home = this.state.columns[source.droppableId];
    const foreign = this.state.columns[destination.droppableId];

    /** **************************************
      re-oredering within same column
    **************************************** */
    if (home === foreign) {
      const newCompanyIds = Array.from(home.companyIds);
      newCompanyIds.splice(source.index, 1);
      newCompanyIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        companyIds: newCompanyIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newHome.id]: newHome,
        },
      };

      this.setState(newState);
      return;
    }

    /** **************************************
     moving from one list to another
     ************************************ */

    const homeCompanyIds = Array.from(home.companyIds);
    homeCompanyIds.splice(source.index, 1);
    const newHome = {
      ...home,
      companyIds: homeCompanyIds,
    };

    axios
      .patch(
        `https://drfvote-magicwand.herokuapp.com/api/v2/companies/${draggableId}`,
        {
          data: {
            type: 'companies',
            id: '5',
            attributes: {
              stage: 'pre-pitch',
            },
          },
        }
      )
      .then((response) => {
        this.setState({ ...transformData(response.data.data), loading: false });
      });
    // .catch(error => {
    //   console.log(error);
    // });

    const foreignCompanyIds = Array.from(foreign.companyIds);
    foreignCompanyIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      companyIds: foreignCompanyIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    this.setState(newState);
  };

  render() {
    return (
        <Layout>
          {this.state.loading ? (
            <div> Loading </div>
          ) : (
            <DragDropContext onDragEnd={this.onDragEnd}>
              <AppContainer>
                {this.state.columnOrder.map((columnId) => {
                  const column = this.state.columns[columnId];
                  const companies = column.companyIds.map(
                    (companyId) => this.state.companies[companyId]
                  );

                  return (
                    <Column
                      key={column.id}
                      column={column}
                      companies={companies}
                    />
                  );
                })}
              </AppContainer>
            </DragDropContext>
          )}
        </Layout>
    );
  }
}
