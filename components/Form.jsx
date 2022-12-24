import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { removeAllFromBasket } from '../redux/basketSlice'

const Form = ({ visible, onClose }) => {
  const form = useRef()
  const router = useRouter()
  const dispatch = useDispatch()
  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    sendEmail()
    router.push('/success')
    dispatch(removeAllFromBasket())
    onClose()
    // console.log(data)
  }

  const sendEmail = () => {
    emailjs
      .sendForm(
        'service_htvfto3',
        'template_2jdv8nc',
        form.current,
        'Ub7F2x9MTVHibIcxU'
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )

    toast.success('Thank you! Information transferred.')
  }

  if (!visible) return null

  return (
    <div
      id="container"
      className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
      onClick={handleOnClose}
    >
      <div className="rounded bg-white p-3">
        <form ref={form} onSubmit={handleSubmit(onSubmit)} className="formInfo">
          <label className="mt-4">
            Name<sup className="text-base text-red-500">*</sup>
          </label>
          <input
            type="text"
            name="name"
            className="formInput"
            {...register('name', { required: 'Name field is empty' })}
          />
          {errors.name && (
            <p className="text-sm font-bold text-[#ff5b4b] opacity-90">
              {errors.name.message}
            </p>
          )}
          <label className="mt-4">
            Phone number<sup className="text-base text-red-500">*</sup>
          </label>
          <input
            type="tel"
            name="phone"
            className="formInput"
            {...register('phone', { required: 'Phone field is empty' })}
          />
          {errors.phone && (
            <p className="text-sm font-bold text-[#ff5b4b] opacity-90">
              {errors.phone.message}
            </p>
          )}
          <label className="mt-4">Email</label>
          <input
            type="email"
            name="email"
            className="formInput"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm font-bold text-[#ff5b4b] opacity-90">
              {errors.email.message}
            </p>
          )}
          <label className="mt-4">Message</label>
          <textarea
            name="message"
            className="formTextarea"
            {...register('message')}
          />
          <input
            type="submit"
            value="Buy Now"
            className="mt-8 w-[100%] cursor-pointer rounded-md border-none bg-gradient-to-r from-[#22c55e] to-[#ff5b4b] p-3 font-bold text-white transition active:scale-95"
          />
        </form>
      </div>
    </div>
  )
}

export default Form
