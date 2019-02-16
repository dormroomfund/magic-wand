import { Status } from '../schemas/company';

/*
 * @params array of companies
 * returns formatted data for Kanban board
 */

const transformData = (arr) => {
  const partnerNames = new Set([]);

  const columns = {
    applied: {
      id: Status.Applied,
      title: 'New Applications',
      companies: [],
    },
    pipeline: {
      id: Status.Pipeline,
      title: 'Pipeline',
      companies: [],
    },
    deferred: {
      id: Status.Deferred,
      title: 'Check In Later',
      companies: [],
    },
    pitch: {
      id: Status.Pitching,
      title: 'Pitching',
      companies: [],
    },
  };

  arr.forEach((elt) => {
    const companyObj = {
      id: elt.id,
      name: elt.name,
      description: elt.description,
      pointPartnersNames: elt.pointPartnerNames
        ? new Set(elt.pointPartnerNames)
        : new Set([]),
    };

    /*
     * Compile a list of all the partnerNames
     */
    companyObj.pointPartnersNames.forEach((name) => {
      partnerNames.add(name);
    });

    /*
     * If the company's status fits in one of the columns add it
     * to that column.
     */
    if (elt.status in columns) {
      columns[elt.status].companies.push(companyObj);
    } else {
      throw Error('Status is not valid.');
    }
  });

  return {
    columns,
    columnOrder: ['applied', 'pipeline', 'deferred', 'pitch'],
    partnerNames,
  };
};

export default transformData;
