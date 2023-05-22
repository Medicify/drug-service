import { Request, Response } from 'express';
import IResponse from '../interfaces/response';
import Drug from '../repositories/Drug';

let RESPONSE: IResponse = {
  service: 'drug service',
};

const getAllDrug = async (request: Request, response: Response) => {
  const { page, take } = request.query;

  if (page && parseInt(page as string) < 1) {
    return response.status(400).json({
      ...RESPONSE,
      status: 'error',
      message: 'page number must greater than 1',
      response: {
        data: null,
        page: null,
        total: null,
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
          page: {
            current: null,
            next: null,
            prev: null,
          },
          data: null,
        },

        request: null,
      });
    }

    return response.status(200).json({
      ...RESPONSE,
      status: 'success',
      message: `get all data on page ${skip} content ${content}`,
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
    message: 'get all data',
    request: null,
    response: {
      total: totalData,
      page: { current: null, next: null, prev: null },
      data: drugs,
    },
  });
};

const drugController = {
  drugs: getAllDrug,
};

export default drugController;
