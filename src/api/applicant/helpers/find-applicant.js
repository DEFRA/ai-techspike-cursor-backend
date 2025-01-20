/**
 * Finds and returns a single applicant record from mongodb.
 * @param { Db } db
 * @param { string } referenceNumber
 * @returns {Promise<WithId<Document> | null>}
 */
function findApplicant(db, referenceNumber) {
  return db
    .collection('applicants')
    .findOne({ referenceNumber }, { projection: { _id: 0 } })
}

export { findApplicant }

/**
 * @import { Db, WithId, Document } from 'mongodb'
 */
