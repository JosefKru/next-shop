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

  console.log(body.length)
  return (
    <div className=' pb-6'>
      <SanityBlockContent
        blocks={body.length > 1 ? body.slice(0, 1) : body}
        imageOptions={{ w: 1000, h: 750, fit: 'max' }}
        projectId={config.projectId}
        dataset={config.dataset}
      />
    </div>
  )
}

export default Description
