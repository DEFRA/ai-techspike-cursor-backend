/**
 * Creates a new applicant record in mongodb.
 * @param { Db } db
 * @param { ApplicantData } data
 * @returns {Promise<InsertOneResult>}
 */
function createApplicant(db, data) {
  return db.collection('applicants').insertOne(data)
}

export { createApplicant }

/**
 * @typedef {Object} ApplicantData
 * @property {string} referenceNumber
 * @property {Object} applicant
 * @property {string} submittedAt
 *
 * @import { Db, InsertOneResult } from 'mongodb'
 */
