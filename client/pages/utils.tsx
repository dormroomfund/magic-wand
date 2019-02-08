/*
 * @params array of companies
 * returns formatted data for Kanban board
 */
const transformData = (arr) => {
  const company_list = {};

  const columns = {
    applied: {
      id: 'applied',
      title: 'New Applications',
      companyIds: [],
    },
    pre_pitch: {
      id: 'pre_pitch',
      title: 'Pre Pitch',
      companyIds: [],
    },
    deferred: {
      id: 'deferred',
      title: 'Check In Later',
      companyIds: [],
    },
    pitch: {
      id: 'pitch',
      title: 'Pitching',
      companyIds: [],
    },
  };

  arr.forEach((elt) => {
    const id = elt.id;
    company_list[id] = {
      id,
      name: elt.name,
      description: elt.description,
    };

    /*
     * If the company's status fits in one of the columns add it
     * to that column.
     */
    if (elt.status in columns) {
      columns[elt.status].companyIds.push(id);
    } else {
      throw 'Status is not valid.';
    }
  });

  return {
    columns,
    companies: company_list,
    columnOrder: ['applied', 'pre_pitch', 'deferred', 'pitch'],
  };
};

export default transformData;
