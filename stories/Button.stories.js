import Button from '../components/Button'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export const Default = () => <Button title='Click me' />

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    title: 'черт картавый!',
  },
}

// export const Secondary = {
//   args: {
//     label: 'Button',
//   },
// }

// export const Large = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// }

// export const Small = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// }
