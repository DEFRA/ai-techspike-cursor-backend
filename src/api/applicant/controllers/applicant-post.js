import Joi from 'joi'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'
import { createApplicant } from '~/src/api/applicant/helpers/create-applicant.js'

/**
 * @satisfies {Partial<ServerRoute>}
 */
const applicantPostController = {
  options: {
    validate: {
      payload: Joi.object({
        referenceNumber: Joi.string()
          .required()
          .pattern(/^APP-[A-Z0-9]{4}-[A-Z0-9]{4}$/),
        applicant: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          business: Joi.object({
            name: Joi.string().required(),
            address: Joi.object().required()
          }).required()
        }).required(),
        submittedAt: Joi.date().iso().required()
      })
    }
  },
  handler: async (request, h) => {
    await createApplicant(request.db, request.payload)
    return h.response({ message: 'success' }).code(statusCodes.ok)
  }
}

export { applicantPostController }

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
