import {
  applicantGetController,
  applicantPostController
} from '~/src/api/applicant/controllers/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
const applicant = {
  plugin: {
    name: 'applicant',
    register: (server) => {
      server.route([
        {
          method: 'GET',
          path: '/applicant/{referenceNumber}',
          ...applicantGetController
        },
        {
          method: 'POST',
          path: '/applicant',
          ...applicantPostController
        }
      ])
    }
  }
}

export { applicant }

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
