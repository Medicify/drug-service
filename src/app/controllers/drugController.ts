import { Request, Response } from 'express';
import IResponse from '../interfaces/response';
import Drug from '../repositories/Drug';

const RESPONSE: IResponse = {
  service: 'drug service',
};

const getAllDrug = async (request: Request, response: Response) => {
  const { page, take, title } = request.query;

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

const drugController = {
  drugs: getAllDrug,
};

export default drugController;
