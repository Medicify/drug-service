import database from '../config/database';

const getAllDrugs = async () => {
  const drugs = await database.drugs.findMany({
    orderBy: {
      title: 'asc',
    },
  });
  const totalData = drugs.length;
  return { drugs, totalData };
};

const getDrugsByPagination = async (page: number = 1, content: number = 10) => {
  const skip = (page - 1) * content;

  const drugs = await database.drugs.findMany({
    skip,
    orderBy: {
      title: 'asc',
    },
    take: content,
  });

  const totalData = drugs.length;

  return { drugs, totalData };
};

const Drug = {
  getAll: getAllDrugs,
  getByPagination: getDrugsByPagination,
};

export default Drug;
