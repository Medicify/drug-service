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

const getDrugsByPagination = async (page = 1, content = 10) => {
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

const getDrugByTitle = async (title: string) => {
  const drugs = await database.drugs.findMany({
    orderBy: {
      title: 'asc',
    },
    where: {
      title: {
        contains: title,
      },
    },
  });
  const totalData = drugs.length;

  return { drugs, totalData };
};

const getDrugByCategory = async (category: string) => {
  const drugs = await database.drugs.findMany({
    orderBy: {
      title: 'asc',
    },
    where: {
      OR: [
        {
          title: {
            contains: category,
          },
        },
        {
          package: {
            contains: category,
          },
        },
      ],
    },
  });
  const totalData = drugs.length;
  return { drugs, totalData };
};

const getDrugByCategoryAndTitle = async (category: string, title: string) => {
  const drugs = await database.drugs.findMany({
    orderBy: {
      title: 'asc',
    },
    where: {
      AND: [
        {
          title: {
            contains: title,
          },
        },
        {
          title: {
            contains: category,
          },
        },
      ],
    },
  });
  const totalData = drugs.length;
  return { drugs, totalData };
};

const Drug = {
  getAll: getAllDrugs,
  getByPagination: getDrugsByPagination,
  getByTitle: getDrugByTitle,
  getByCategory: getDrugByCategory,
  getByCategoryTitle: getDrugByCategoryAndTitle,
};

export default Drug;
