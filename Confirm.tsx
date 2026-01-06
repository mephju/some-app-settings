import { useState, type ButtonHTMLAttributes } from 'react'
import { type Jsx } from '~/utils/T'

export type ConfirmProps = {
  onConfirm?: ButtonAttribs['onClick']
  render: (props: {
    isConfirming: boolean
    onClick?: ButtonAttribs['onClick']
    onBlur?: ButtonAttribs['onBlur']
    onKeyUp: ButtonAttribs['onKeyUp']
  }) => Jsx
}

type ButtonAttribs = ButtonHTMLAttributes<HTMLButtonElement>

const Confirm = (props: ConfirmProps) => {
  const { render } = props
  const [isConfirming, setConfirming] = useState(false)

  const onClick: ButtonAttribs['onClick'] = isConfirming
    ? props.onConfirm
    : (ev) => {
        ev.preventDefault()
        setConfirming(true)
      }

  const onKeyUp: ButtonAttribs['onKeyUp'] = isConfirming
    ? (e) => {
        if (e.key === 'Escape') {
          setConfirming(false)
        }
      }
    : undefined

  const onBlur = isConfirming ? () => setConfirming(false) : undefined

  return render({
    onClick,
    onBlur,
    onKeyUp,
    isConfirming,
  })

  // <DropdownMenu>
  // 	<DropdownMenuTrigger asChild>{safeClone}</DropdownMenuTrigger>
  // 	<DropdownMenuContent>
  // 		<DropdownMenuLabel>{question}</DropdownMenuLabel>
  // 		<DropdownMenuItem>{dangerousClone}</DropdownMenuItem>
  // 	</DropdownMenuContent>
  // </DropdownMenu>
}

export default Confirm
