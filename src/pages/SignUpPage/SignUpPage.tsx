const SignUpPage = () => {
    return (
        <article className="container">

            <section className="block__item block-item">
                <h2 className="block-item__title">У вас уже есть аккаунт?</h2>
                <a href="signInform.html" className="block-item__btn signin-btn">Войти</a>
            </section>

            <form action="#" className="form form_signup" id="registration-form">
                <h3 className="form__title">Регистрация</h3>
                <label>
                    <input name="name" className="form__input" id="name" placeholder="Имя" />
                </label>
                <label>
                    <input name="middlename" className="form__input" id="middlename" placeholder="Отчество" />
                </label>
                <label>
                    <input name="lastname" className="form__input" id="lastname" placeholder="Фамилия" />
                </label>
                <label>
                    <input name="login" className="form__input" id="login" placeholder="Логин" />
                </label>
                <label>
                    <input type="password" name="password" className="form__input" id="password" placeholder="Пароль" />
                </label>
                <button type="submit" className="form__btn_signup">Зарегистрироваться</button>
            </form>
        </article>
    )
}

export {
    SignUpPage
}