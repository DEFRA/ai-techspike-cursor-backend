import Boom from '@hapi/boom'
import isNull from 'lodash/isNull.js'

import { findApplicant } from '~/src/api/applicant/helpers/find-applicant.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

/**
 * @satisfies {Partial<ServerRoute>}
 */
const applicantGetController = {
  /**
   * @param { Request & MongoDBPlugin } request
   * @param { ResponseToolkit } h
   * @returns { Promise<*> }
   */
  handler: async (request, h) => {
    const applicant = await findApplicant(
      request.db,
      request.params.referenceNumber
    )
    if (isNull(applicant)) {
      return Boom.notFound('Applicant not found')
    }

    return h.response({ message: 'success', applicant }).code(statusCodes.ok)
  }
}

export { applicantGetController }

/**
 * @import { Request, ResponseToolkit, ServerRoute} from '@hapi/hapi'
 * @import { MongoDBPlugin } from '~/src/api/common/helpers/mongodb.js'
 */
