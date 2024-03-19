import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import page from './page'

export const schemaTypes = [post, page, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, page, blockContent],
}
