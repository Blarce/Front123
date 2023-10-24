import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './SignUpPage.module.css';
import {SiSurveymonkey} from "react-icons/si";
import {BiSolidLockAlt} from "react-icons/bi";
import {AiOutlineUser} from "react-icons/ai";
import {LiaTelegramPlane} from "react-icons/lia"
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  headers:{
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
});

type Inputs = {
  name: string
  middleName: string
  lastName: string
  login: string
  password: string
}

const SignUpPage = () => {
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
      const response = await axiosInstance.post('/registration', requestBody)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
    console.log(requestBody)
  }

  return (
    <div className={styles.signUp_section}>
      <div className={styles.boxForm}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id='registration-form'
          action=''
        >
          <h2>Регистрация</h2>
          <div className={styles.inputBox}>
            <span className={styles.icon}>
              <AiOutlineUser />
            </span>
            <input
                {...register('name')}
                type='text' required
                id='name'
                pattern='^[a-zA-Z0-9_.-]*$'
            />
            <label>Имя</label>
          </div>
          <div className={styles.inputBox}>
            <span className={styles.icon}>
              <AiOutlineUser />
            </span>
            <input
                {...register('middleName')}
                type='text' required
                id='middleName'
                pattern='^[a-zA-Z0-9_.-]*$'
            />
            <label>Отчество</label>
          </div>
          <div className={styles.inputBox}>
            <span className={styles.icon}>
              <AiOutlineUser/>
            </span>
            <input
                {...register('lastName')}
                type='text' required
                id='lastName'
                pattern='^[a-zA-Z0-9_.-]*$'
            />
            <label>Фамилия</label>
          </div>
          <div className={styles.inputBox}>
            <span className={styles.icon}>
              <SiSurveymonkey />
            </span>
            <input
                {...register('login')}
                type='text' required
                id='login'
                pattern='^[a-zA-Z0-9_.-]*$'
            />
            <label>Логин</label>
          </div>
          <div className={styles.inputBox}>
            <span className={styles.icon}>
              <BiSolidLockAlt />
            </span>
            <input
                {...register('password')}
                type='password' required
                id='password'
                pattern='^[a-zA-Z0-9_.-]*$'
            />
            <label>Пароль</label>
          </div>
          <div className={styles.inputBox}>
            <span className={styles.icon}>
              <BiSolidLockAlt />
            </span>
            <input
                type='password' required
                id='passwordSumbit'
                pattern='^[a-zA-Z0-9_.-]*$'
            />
            <label>Подтвердите пароль</label>
          </div>
          <div className={styles.inputBox}>
            <span className={styles.icon}>
              <LiaTelegramPlane />
            </span>
            <input
                type='text' required
                id='telegrammId'
                pattern='^[a-zA-Z0-9_.-]*$'
            />
            <label>Telegram id</label>
          </div>
          <button type='submit' className={styles.signUpButton}>
            <Link to='/main'>
              Вход
            </Link>
          </button>
          <div className={styles.alreadyHave}>
            <p>
              У вас уже есть аккаунт?
              <a> </a>
              <a>
                <Link to='/sign-in'>
                  Войти
                </Link>
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export {
  SignUpPage,
}