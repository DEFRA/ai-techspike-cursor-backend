import { createServer } from '~/src/api/index.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

describe('#applicantPostController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    await server.db.collection('applicants').deleteMany({})
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  const validPayload = {
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

  test('Should create applicant with valid payload', async () => {
    const { result, statusCode } = await server.inject({
      method: 'POST',
      url: '/applicant',
      payload: validPayload
    })

    expect(statusCode).toBe(statusCodes.ok)
    expect(result).toEqual({ message: 'success' })

    const savedApplicant = await server.db
      .collection('applicants')
      .findOne(
        { referenceNumber: validPayload.referenceNumber },
        { projection: { _id: 0 } }
      )
    expect(savedApplicant).toEqual(validPayload)
  })

  test('Should reject invalid reference number format', async () => {
    const { statusCode, result } = await server.inject({
      method: 'POST',
      url: '/applicant',
      payload: {
        ...validPayload,
        referenceNumber: 'INVALID'
      }
    })

    expect(statusCode).toBe(statusCodes.badRequest)
    expect(result.message).toContain('referenceNumber')
  })

  test('Should reject invalid email format', async () => {
    const { statusCode, result } = await server.inject({
      method: 'POST',
      url: '/applicant',
      payload: {
        ...validPayload,
        applicant: {
          ...validPayload.applicant,
          email: 'not-an-email'
        }
      }
    })

    expect(statusCode).toBe(statusCodes.badRequest)
    expect(result.message).toContain('email')
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
