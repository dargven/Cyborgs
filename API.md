# Описание методов API

## Оглавление

## Адрес домена
```http://localhost```

## Структуры данных
* Успешный ответ
```
CorrectAnswer = {
    result: 'ok',
    data: Data
}
```

* Ошибка
```
WrongAnswer = {
    result: 'error',
    error: {
        code: number,
        text: string
    }
}
```

* Пользователь
```
User = {
    id: number,
    name: string,
    token: string,
}
```

## Метод login
### адрес
```/?method=login```
### параметры
|параметр|тип|комментарий|
|-|-|-|
|login|string|логин юзера|
|hash|string|md5(md5(login+password)+rnd)|
|rnd|number|целое рандомное число|
### Успешный ответ
```
CorrectAnswer=>User
```
### Ошибки
```
WrongAnswer(code: 1001, text: 'params login or password not set')
WrongAnswer(code: 1002, text: 'error in auth user')
WrongAnswer(code: 1004, text: '-')
```

## Метод logout
### адрес
```/?method=logout```
### параметры
|параметр|тип|комментарий|
|-|-|-|
|token|string|авторизационный токен|
### Успешный ответ
```
CorrectAnswer=>true
```
### Ошибки
```
WrongAnswer(code: 242, text: 'params not set fully ')
```