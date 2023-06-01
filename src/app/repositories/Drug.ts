import database from '../config/database';

const patternTitle = /[\d.]/

const getAllDrugs = async () => {
  const drugs = await database.drugs.findMany({
    orderBy: {
      title: 'asc',
    },
  });

  drugs.forEach((drug : any, index: number) => {
    drugs[index].title =  drug.title.split(patternTitle)[0] 
  })

  
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

  drugs.forEach((drug : any, index: number) => {
    drugs[index].title =  drug.title.split(patternTitle)[0] 
  })


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

  drugs.forEach((drug : any, index: number) => {
    drugs[index].title =  drug.title.split(patternTitle)[0] 
  })

  const totalData = drugs.length;

  return { drugs, totalData };
};

const getDrugByCategory = async (category: string) => {
  const drugs = await database.drugs.findMany({
    orderBy: {
      title: 'asc',
    },
    where: {
      type: {
        contains: category,
      },
    },
  });

  drugs.forEach((drug : any, index: number) => {
    drugs[index].title =  drug.title.split(patternTitle)[0] 
  })

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
          type: {
            contains: category,
          },
        },
      ],
    },
  });

  drugs.forEach((drug : any, index: number) => {
    drugs[index].title =  drug.title.split(patternTitle)[0] 
  })

  const totalData = drugs.length;
  return { drugs, totalData };
};

const getDrugByID = async (id: string) => {
  const drugs = await database.drugs.findFirst({
    orderBy: {
      title: 'asc',
    },
    where: {
      id,
    },
  });

  if(drugs) {
    drugs.title = drugs.title &&  drugs.title.split(patternTitle)[0] 
  }
 

  const totalData = 1;
  return { drugs, totalData };
};

const Drug = {
  getAll: getAllDrugs,
  getByPagination: getDrugsByPagination,
  getByTitle: getDrugByTitle,
  getByCategory: getDrugByCategory,
  getByCategoryTitle: getDrugByCategoryAndTitle,
  getByID: getDrugByID,
};

export default Drug;
