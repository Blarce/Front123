import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { Link } from 'react-router-dom'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  headers:{
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
});

type Inputs = {

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
    login,
    password,
  }) => {
    const requestBody = {
      username: login,
      password: password,
    }

    try {
      // поменять УРЛ на урл локально развернутого бэка
      const response = await axiosInstance.post('/login', requestBody)
      console.log(response)
    } catch (error) {
      console.error(error)
    }

    console.log(requestBody)
  }

  return (
    <body>
      <article className='container'>
        <section className='block__item block-item'>
          <h2 className='block-item__title'>Вход</h2>
          {/*<Link to='/sign-in' className='block-item__btn signin-btn'>*/}
          {/*  Войти*/}
          {/*</Link>*/}
        </section>
        <label>
          <input
              {...register('login')}
              className='form__input'
              id='login'
              placeholder='Логин'
          />
        </label>
        <label>
          <input
              {...register('password')}
              name='password'
              className='form__input'
              id='password'
              placeholder='Пароль'
          />
        </label>
        <button type='submit' className='form__btn_signin'>
          Вход
        </button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='form form_signup'
          id='registration-form'
        >
          <h3 className='form__title'>Войти</h3>
        </form>
      </article>
    </body>
  )
}

export {
  SignInPage,
}