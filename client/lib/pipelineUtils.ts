import { Status } from '../schemas/company';

/*
 * @params array of companies
 * returns formatted data for Kanban board
 */

const transformData = (arr) => {
  const partnerNames = new Set([]);

  const columns = {
    [Status.Applied]: {
      id: Status.Applied,
      title: 'New Applications',
      companies: [],
    },
    [Status.Pipeline]: {
      id: Status.Pipeline,
      title: 'Pipeline',
      companies: [],
    },
    [Status.Deferred]: {
      id: Status.Deferred,
      title: 'Check In Later',
      companies: [],
    },
    [Status.Pitching]: {
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
      // TODO: FIX THIS BUG - Deals with how we determine archived state in ArchiveContainer
      // throw Error('Status is not valid.');
    }
  });

  return {
    columns,
    columnOrder: [
      Status.Applied,
      Status.Pipeline,
      Status.Deferred,
      Status.Pitching,
    ],
    partnerNames,
  };
};

export default transformData;
