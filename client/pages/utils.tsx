/*
@params array of companies
returns formatted data for Kanban board
*/

const transformData = arr => {
  let company_list = {};

  let columns = {
    applied: {
      id: "applied",
      title: "New Applications",
      companyIds: []
    },
    pre_pitch: {
      id: "pre_pitch",
      title: "Pre Pitch",
      companyIds: []
    },
    deferred: {
      id: "deferred",
      title: "Check In Later",
      companyIds: []
    },
    pitch: {
      id: "pitch",
      title: "Pitching",
      companyIds: []
    },
  };

  for (let i in arr) {
    let id = arr[i]["id"];
    company_list[id] = {
      id: id,
      name: arr[i]["name"],
      description: arr[i]["description"]
    };

    if (arr[i]['status'] in columns) {
      columns[arr[i]["status"]]["companyIds"].push(id);
    }
  }

  return {
    columns: columns,
    companies: company_list,
    columnOrder: ["applied", "pre_pitch", "deferred", "pitch"]
  };
};

export default transformData;
