import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { Link } from 'react-router-dom'

type Inputs = {
  name: string
  middleName: string
  lastName: string
  login: string
  password: string
}

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({
    name,
    middleName,
    lastName,
    login,
    password,
  }) => {

    const requestBody = {
      username: login,
      second_name: middleName,
      password: password,
      name: name,
      last_name: lastName,
    }

    try {
      // поменять УРЛ на урл локально развернутого бэка
      const response = await axios.post('http://localhost:8080/', requestBody, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }

    console.log(requestBody)
  }

  return (
    <article className='container'>
      <section className='block__item block-item'>
        <h2 className='block-item__title'>У вас уже есть аккаунт?</h2>
        {/*<Link to='/sign-in' className='block-item__btn signin-btn'>*/}
        {/*  Войти*/}
        {/*</Link>*/}
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='form form_signup'
        id='registration-form'
      >
        <h3 className='form__title'>ВЪЪЪЪЪход</h3>

      </form>
    </article>
  )
}

export {
  SignInPage,
}