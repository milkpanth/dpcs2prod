const { mockRequest, mockResponse } = require('../helpers/interceptor')
const controller = require('../controllers/modelController')

describe("Check method list", () => {
  test('list user', async () => {
    let req = mockRequest()
    const res = mockResponse()

    await controller.list(req, res)

    expect(res.json).toHaveBeenCalledTimes(1)
  });
});