import SanityBlockContent from '@sanity/block-content-to-react'
import { config } from '../lib/client'

const Description = ({ body }) => {
  console.log(body)
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
    <div className="">
      <SanityBlockContent
        blocks={body}
        imageOptions={{ w: 1000, h: 750, fit: 'max' }}
        projectId={config.projectId}
        dataset={config.dataset}
      />
    </div>
  )
}

export default Description
