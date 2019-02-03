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
    }
  };

  for (let i in arr) {
    let id = arr[i]["id"];
    let attributes = arr[i]["attributes"];
    company_list[id] = {
      id: id,
      name: attributes["name"],
      description: attributes["description"]
    };

    columns[attributes["stage"]]["companyIds"].push(id);
  }

  return {
    columns: columns,
    companies: company_list,
    columnOrder: ["applied", "pre_pitch", "deferred", "pitch"]
  };
};

export default transformData;
