import SanityBlockContent from '@sanity/block-content-to-react'
import { config } from '../lib/client'

const Description = ({ body }) => {
  const serializers = {
    types: {
      code: (props) => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      ),
    },
  }

  return (
    <SanityBlockContent
      blocks={body}
      imageOptions={{ w: 1000, h: 750, fit: 'max' }}
      projectId={config.projectId}
      dataset={config.dataset}
    />
  )
}

export default Description
