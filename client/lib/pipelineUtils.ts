import { consoleTestResultHandler } from 'tslint/lib/test';
import { Status, Company } from '../schemas/company';
import client from './client';
import { DocumentTypes } from '../schemas/gdrive';

/*
 * @params array of companies
 * returns formatted data for Kanban board
 */

export const transformData = (arr: Company[]) => {
  const partners = new Set([]);

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
      team: elt.team,
      pointPartners: elt.pointPartners
        ? new Set(elt.pointPartners.map((partner) => partner))
        : new Set([]),
    };

    /*
     * Compile a list of all the partners
     */
    companyObj.pointPartners.forEach((partner) => {
      partners.add(partner);
    });

    /*
     * If the company's status fits in one of the columns add it
     * to that column.
     */
    if (elt.status in columns) {
      columns[elt.status].companies.push(companyObj);
    } else {
      // TODO: FIX THIS BUG - Deals with how we determine archived state in ResearchContainer
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
    partners,
  };
};

/*
 * When a company is moved to the pitching state, Google Drive documents are
 * generated. Repeat documents are checked for in case a card was moved to pitching g
 * and then moved away from it.
 */
export const generateGoogleDriveDocuments = async (company: Company) => {
  const tasks = [];

  if (
    !company.companyLinks.find((link) => link.name === DocumentTypes.Prevote)
  ) {
    tasks.push({
      documentType: DocumentTypes.Prevote,
      companyId: company.id,
    });
  }

  if (
    !company.companyLinks.find(
      (link) => link.name === DocumentTypes.ExternalSnapshot
    )
  ) {
    tasks.push({
      documentType: DocumentTypes.ExternalSnapshot,
      companyId: company.id,
    });
  }

  if (
    !company.companyLinks.find(
      (link) => link.name === DocumentTypes.InternalSnapshot
    )
  ) {
    tasks.push({
      documentType: DocumentTypes.InternalSnapshot,
      companyId: company.id,
    });
  }

  for (const task of tasks) {
    await client.service('api/gdrive').create(task);
  }
};
