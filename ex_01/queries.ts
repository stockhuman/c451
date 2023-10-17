// @ts-nocheck
/**
 * All extraneous portions of this setup were ommitted.
 */

// ----------------------------------------------------------
// The following extracts the titles of all LPT posts from the dataset,
// and sorts them by karma score, returning only score, and postTitle
const database = client.db('exec')
const lpt = database.collection('lpt')

const cursor = lpt
  .find({ subreddit: 'LifeProTips' })
  .sort({ score: 1 })
  .project({ _id: 0, score: 1, postTitle: 1 })

for await (const doc of cursor) {
  console.log(doc)
  /**
   * The highest scoring result:
   * ```
   * {
   *    postTitle: "LPT: keep your mouth shut, and don't volunteer information",
   *    score: 147296
   * }
   * ```
   * Hilarious.
   */
}

// ----------------------------------------------------------
// The following will find anyone who has posted more than once and received the
// honour of making it to this compilation (>=1000 karma on post)
const res = await lpt
  .aggregate([
    { $group: { _id: '$author', count: { $sum: 1 } } },
    { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
    { $sort: { count: -1 } },
    { $project: { author: '$_id', _id: 0 } },
  ])
  .toArray()
// the top author is unfortunately "[deleted]", but following that,
// #2 spot (and surely the real #1) is "u/zazzlekdazzle" with 25 posts.

const res = await lpt.find({ author: 'zazzlekdazzle' }).toArray() // will enumerate them.

// ----------------------------------------------------------
// Redditors when they receive gold:
await lpt.createIndex({ postBody: 'text' })
const query = { $text: { $search: 'thanks for the gold' } }
const projection = {
  _id: 0,
  postBody: 1,
}

const res = await lpt.find(query).project(projection).toArray()

console.log(res.length) // 1061 - I expected more. :P
// perusing the results, they all broadly match as loose text search implies,
// but changing the query to "\"thanks for the gold\"" nets only 40 with the exact phrase.

// ----------------------------------------------------------
// RIP "$where not allowed in this atlas tier"
const query = { $where: 'this.postTitle.length < 40' }

// ----------------------------------------------------------
// The following finds only short LPTs things YSK
const query = {
  postTitle: { $exists: true },
  $expr: { $lt: [{ $strLenCP: '$postTitle' }, 40] },
}
/**
 * example results:
 * { postTitle: 'LPT: Hire movers' },
 * { postTitle: 'LPT: Stop chasing after people' },
 * { postTitle: 'LPT Go clean your sink faucet aerator.' },
 * { postTitle: "LPT: Don't buy lilies if you have a cat" }
 */

// ----------------------------------------------------------
// This creates a composite index of popularity, combining the sum of
// both comments and karma, and sorting by that value.
const res = await lpt
  .aggregate([
    {
      $project: {
        _id: '$postTitle',
        totalAmount: { $sum: ['$numComments', '$score'] },
      },
    },
  ])
  .sort({ totalAmount: 1 })
  .toArray()

console.log(res) // ex: { _id: 'LPT: Save your dog with CPR.', totalAmount: 1087 },
