import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import side from './side'
import tegning from './tegning'
import galleri from './galleri'
import meny from './meny'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([/*blockContent, post, author, category, */side, tegning, galleri, meny])
})
