import { createServer } from '~/src/api/index.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

describe('#applicantGetController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('With existing applicant', () => {
    const mockApplicant = {
      referenceNumber: 'APP-SGUC-4SXH',
      applicant: {
        name: 'Steve Dickinson',
        email: 'steve.dickinson@defra.gov.uk',
        business: {
          name: 'Dees Things',
          address: { line1: '123 Test St' }
        }
      },
      submittedAt: '2025-01-20T18:29:58.212Z'
    }

    beforeEach(async () => {
      await server.db.collection('applicants').insertOne(mockApplicant)
    })

    afterEach(async () => {
      await server.db.collection('applicants').deleteMany({})
    })

    test('Should return applicant when found', async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/applicant/APP-SGUC-4SXH'
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual({
        message: 'success',
        applicant: mockApplicant
      })
    })
  })

  test('Should return 404 when applicant not found', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/applicant/APP-XXXX-XXXX'
    })

    expect(statusCode).toBe(statusCodes.notFound)
    expect(result).toEqual({
      statusCode: 404,
      error: 'Not Found',
      message: 'Applicant not found'
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
