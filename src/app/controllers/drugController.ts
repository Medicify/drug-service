import { Request, Response } from 'express';
import IResponse from '../interfaces/response';
import Drug from '../repositories/Drug';

const RESPONSE: IResponse = {
  service: 'drug service',
};

const getAllDrug = async (request: Request, response: Response) => {
  const { page, take, title, category } = request.query;

  if (category && title) {
    const { drugs, totalData } = await Drug.getByCategoryTitle(
      category as string,
      title as string
    );
    if (totalData < 1) {
      return response.status(400).json({
        ...RESPONSE,
        status: 'error',
        message: `${category} and ${title} not contain on drug database`,
        request: { ...request.query },
        response: { total: null, data: null },
      });
    }
    return response.status(200).json({
      ...RESPONSE,
      status: 'success',
      message: `get drug by category ${category} and title ${title}`,
      request: { ...request.query },
      response: { total: totalData, data: drugs },
    });
  }

  if (category) {
    const { drugs, totalData } = await Drug.getByCategory(category as string);
    if (totalData < 1) {
      return response.status(400).json({
        ...RESPONSE,
        status: 'error',
        message: `${category} not contain on drug database`,
        request: { ...request.query },
        response: { total: null, data: null },
      });
    }
    return response.status(200).json({
      ...RESPONSE,
      status: 'success',
      message: `get drug by category ${category}`,
      request: { ...request.query },
      response: { total: totalData, data: drugs },
    });
  }

  if (title) {
    const { drugs, totalData } = await Drug.getByTitle(title as string);

    if (totalData < 1) {
      return response.status(400).json({
        ...RESPONSE,
        status: 'error',
        message: `${title} not contain on drug database`,
        request: { ...request.query },
        response: { total: null, data: null },
      });
    }

    return response.status(200).json({
      ...RESPONSE,
      status: 'success',
      message: `get drug by title ${title}`,
      request: { ...request.query },
      response: { total: totalData, data: drugs },
    });
  }

  if (page && parseInt(page as string) < 1) {
    return response.status(400).json({
      ...RESPONSE,
      status: 'error',
      message: 'page number must greater than 1',
      response: {
        total: null,
        data: null,
      },
      request: null,
    });
  }

  const skip = page ? parseInt(page as string) : 1;
  const content = take ? parseInt(take as string) : 10;

  if (page || take) {
    const { drugs, totalData } = await Drug.getByPagination(skip, content);

    if (totalData < 1) {
      return response.status(400).json({
        ...RESPONSE,
        status: 'error',
        message: 'drugs not found',
        response: {
          total: null,
          data: null,
        },

        request: null,
      });
    }

    return response.status(200).json({
      ...RESPONSE,
      status: 'success',
      message: `get all drug on page ${skip} content ${content}`,
      request: {
        ...request.query,
      },
      response: {
        total: totalData,
        page: {
          current: skip,
          next: skip + 1,
          prev: skip == 1 ? null : skip - 1,
        },
        data: drugs,
      },
    });
  }

  const { drugs, totalData } = await Drug.getAll();

  return response.status(200).json({
    ...RESPONSE,
    status: 'success',
    message: 'get all drug',
    request: null,
    response: {
      total: totalData,
      data: drugs,
    },
  });
};

const getDrug = async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!id)
    return response.status(400).json({
      ...RESPONSE,
      status: 'error',
      message: `require ID`,
      request: {
        ...request.params,
      },
      response: {
        total: null,
        data: null,
      },
    });

  const { drugs, totalData } = await Drug.getByID(id as string);

  if (!drugs)
    return response.status(400).json({
      ...RESPONSE,
      status: 'error',
      message: `${id} not found`,
      request: {
        ...request.params,
      },
      response: {
        total: null,
        data: null,
      },
    });

  return response.status(200).json({
    ...RESPONSE,
    status: 'success',
    message: `get drug id ${id}`,
    request: {
      ...request.params,
    },
    response: {
      total: totalData,
      data: drugs,
    },
  });
};

const drugController = {
  drugs: getAllDrug,
  drug: getDrug,
};

export default drugController;
