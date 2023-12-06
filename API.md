# Описание методов API

## Оглавление

<!-- TOC -->
* [Описание методов API](#описание-методов-api)
  * [Оглавление](#оглавление)
  * [Адрес домена](#адрес-домена)
  * [Структуры данных](#структуры-данных)
  * [Метод register](#метод-register)
    * [Описание метода](#описание-метода)
    * [Адрес](#адрес)
    * [Параметры](#параметры)
    * [Ошибки](#ошибки)
  * [Метод login](#метод-login)
    * [Описание метода](#описание-метода-1)
    * [Адрес](#адрес-1)
    * [Параметры](#параметры-1)
    * [Успешный ответ](#успешный-ответ)
    * [Ошибки](#ошибки-1)
  * [Метод logout](#метод-logout)
    * [Описание метода](#описание-метода-2)
    * [Адрес](#адрес-2)
    * [Параметры](#параметры-2)
    * [Успешный ответ](#успешный-ответ-1)
    * [Ошибки](#ошибки-2)
  * [Метод selectTeam](#метод-selectteam)
    * [Описание метода](#описание-метода-3)
    * [Адрес](#адрес-3)
    * [Параметры](#параметры-3)
  * [Успешный ответ](#успешный-ответ-2)
  * [Ошибки](#ошибки-3)
  * [Метод getTeamsInfo](#метод-getteamsinfo)
    * [Описание метода](#описание-метода-4)
    * [Адрес](#адрес-4)
    * [Параметры](#параметры-4)
    * [Успешный ответ](#успешный-ответ-3)
    * [Ошибки](#ошибки-4)
  * [Метод getSkins](#метод-getskins)
    * [Описание метода](#описание-метода-5)
    * [Адрес](#адрес-5)
    * [Параметры](#параметры-5)
    * [Успешный ответ](#успешный-ответ-4)
    * [Ошибки](#ошибки-5)
  * [Метод setSkin](#метод-setskin)
    * [Описание метода](#описание-метода-6)
    * [Адрес](#адрес-6)
    * [Параметры](#параметры-6)
    * [Успешный ответ](#успешный-ответ-5)
    * [Ошибки](#ошибки-6)
  * [Метод sendMessage](#метод-sendmessage)
    * [Описание метода](#описание-метода-7)
    * [Адрес](#адрес-7)
    * [Параметры](#параметры-7)
    * [Успешной ответ](#успешной-ответ)
    * [Ошибки](#ошибки-7)
  * [Метод getMessages](#метод-getmessages)
    * [Описание метода](#описание-метода-8)
    * [Адрес](#адрес-8)
    * [Параметры](#параметры-8)
    * [Успешной ответ](#успешной-ответ-1)
    * [Ошибки](#ошибки-8)
  * [Метод setDestroyObject](#метод-setdestroyobject)
    * [Адрес](#адрес-9)
    * [Параметры](#параметры-9)
    * [Успешной ответ](#успешной-ответ-2)
    * [Ошибки](#ошибки-9)
  * [Метод getObjects](#метод-getobjects)
    * [Адрес](#адрес-10)
    * [Описание](#описание)
    * [Параметры](#параметры-10)
    * [Успешный ответ](#успешный-ответ-6)
    * [Ошибки](#ошибки-10)
  * [Метод setBullet](#метод-setbullet)
    * [Описание](#описание-1)
    * [Адрес](#адрес-11)
    * [Параметры](#параметры-11)
    * [Успешной ответ](#успешной-ответ-3)
    * [Ошибки](#ошибки-11)
  * [Метод getBullets](#метод-getbullets)
    * [Описание](#описание-2)
    * [Адрес](#адрес-12)
    * [Параметры](#параметры-12)
    * [Успешный ответ](#успешный-ответ-7)
    * [Ошибки](#ошибки-12)
  * [Метод getScene](#метод-getscene)
    * [Описание](#описание-3)
    * [Адрес](#адрес-13)
    * [Параметры](#параметры-13)
    * [Успешный ответ:](#успешный-ответ-8)
    * [Ошибки](#ошибки-13)
  * [Метод setPlayer](#метод-setplayer)
    * [Описание](#описание-4)
    * [Адрес](#адрес-14)
    * [Параметры](#параметры-14)
    * [Успешный ответ:](#успешный-ответ-9)
    * [Ошибки](#ошибки-14)
<!-- TOC -->

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
    name: string,
    token: string,
}
```

## Метод register

### Описание метода

Метод регистрации. См параметры ответа ниже

### Адрес

```/?method=register```

### Параметры

| параметр | тип    | комментарий                  |
|----------|--------|------------------------------|
| login    | string | логин юзера                  |
| name     | string | Имя пользователя             |
| email    | string | Почта пользователя           |
| hash     | string | md5(md5(login+password)+rnd) |

### Ошибки

```
WrongAnswer(code: 1001, text: 'params login or password not set')
WrongAnswer(code: 1003, text: 'Is it unique login?')
```

## Метод login

### Описание метода

Метод авторизации. См параметры ответа ниже

### Адрес

```/?method=login```

### Параметры

| параметр | тип    | комментарий                  |
|----------|--------|------------------------------|
| login    | string | логин юзера                  |
| hash     | string | md5(md5(login+password)+rnd) |
| rnd      | number | целое рандомное число        |

### Успешный ответ

```
CorrectAnswer=>User
```

### Ошибки

```
WrongAnswer(code: 1001, text: 'params login or password not set')
WrongAnswer(code: 1002, text: 'error in auth user')
WrongAnswer(code:1005, text:'Other user is playing wright now. If you doesn`t, please change the password'')
WrongAnswer(code: 1004, text: 'Unable to find user.')
```

## Метод logout

### Описание метода

При успешном ответе(см.ниже) поступает запрос в базу данных, производится поиск по
токену(к какому пользователю принадлежит) и обнуляется

### Адрес

```/?method=logout```

### Параметры

| параметр | тип    | комментарий           |
|----------|--------|-----------------------|
| token    | string | авторизационный токен |

### Успешный ответ

```
CorrectAnswer=>true
```

### Ошибки

```
WrongAnswer(code: 242, text: 'params not set fully ')
Дописать
```

## Метод selectTeam

### Описание метода

При успешной авторизации и при успешном ответе(см ниже) в базу данных, где уникальный идентификатор - это
teamCode, записывается токен пользователя.

### Адрес

```/?method=selectTeam```

### Параметры

| Параметры | Тип    | Комментарий            |
|-----------|--------|------------------------|
| token     | string | Авторизационный токен  |
| teamId    | number | Уникальный Код команды |

## Успешный ответ

```
CorrectAnswer=>true
```

## Ошибки

``` 
WrongAnswer(code:603, text:'Selected team is full')
WrongAnswer(code:604, text: 'Team not found')
WrongAnswer(code:605, text: 'In selected team more gamers than in the other.
Please, select other team ')
WrongAnswer(code:1002, text: 'error in auth user')
WrongAnswer(code: 242, text: 'params not set fully ')
```

## Метод getTeamsInfo

### Описание метода

Из базы данных по teamCode
извлекается информация о команде: количество очков, количество игроков

### Адрес

```
/?method=getTeamsInfo
```

### Параметры

| Параметры | Тип    | Комментарий              |
|-----------|--------|--------------------------|
| token     | number | Аутентификационный токен |

### Успешный ответ

```
CorrectAnswer=>data = {
score: number,
numberOfTeamPoints: number
}
```

### Ошибки

```
WrongAnswer(code:304, text: 'Team not found')

```

## Метод getSkins

### Описание метода

При успешном ответе(см.ниже) возвращаются возможные скины,
применимые для игрока

### Адрес

```/?method = getSkins```

### Параметры

| Параметры | Тип    | Комментарий              |
|-----------|--------|--------------------------|
| token     | string | Аутентификационный токен |     

### Успешный ответ

```
CorrectAnswer=>data = {
{"skin_id":number,
"text":str,
"image":link or image}
}
```

### Ошибки

```
WrongAnswer(code:1002, text: 'error in auth user')
WrongAnswer(code:700, text:'No skins')
WrongAnswer(code: 242, text: 'params not set fully ')


```

## Метод setSkin

### Описание метода

При успешном ответе(см.ниже) устанавливает игроку переданный скин

### Адрес

```/?method = setSkin```

### Параметры

| Параметры | Тип    | Комментарий              |
|-----------|--------|--------------------------|
| token     | string | Аутентификационный токен |   
| skinId    | string | Выбранный скин           |       

### Успешный ответ

```
CorrectAnswer => true
```

### Ошибки

```
WrongAnswer(code:1002, text: 'error in auth user')
WrongAnswer(code:700, text:'No skins')
WrongAnswer(code:701, text:'Skin is not found')
WrongAnswer(code: 242, text: 'params not set fully ')

```

## Метод sendMessage

### Описание метода

При успешной авторизации пользователя, сообщение идет в DB.php

### Адрес

```/?method = sendMessage```

### Параметры

| Параметры | Тип    | Комментарий              |
|-----------|--------|--------------------------|
| token     | string | Аутентификационный токен |
| message   | string | Текст сообщения          |

### Успешной ответ

```
CorrectAnswer => true

```

### Ошибки

```
WrongAnswer(code:1002, text: 'error in auth user')
WrongAnswer(code:706, text : 'text message is empty')

```

## Метод getMessages

### Описание метода

При успешной авторизации пользователя ему вовзращается список сообщений

### Адрес

```/?method = getMessage```

### Параметры

| Параметры | Тип    | Комментарий              |
|-----------|--------|--------------------------|
| token     | string | Аутентификационный токен |

### Успешной ответ

```
CorrectAnswer => data = {
    {"name":str,
    "message":str,
    "created":data | timestamp}

}

```

### Ошибки

```
WrongAnswer(code:1002, text: 'error in auth user')
WrongAnswer(code:706, text : 'text message is empty')

```

## Метод setDestroyObject

### Адрес

```/?method = setDestroyObject```

### Параметры

| Параметры | Тип    | Комментарий                            |
|-----------|--------|----------------------------------------|
| token     | string | Аутентификационный токен               |
| objectId  | number | Уникальный id объекта                  |
| state     | number | 1 или 0. 1-destroyed, 0 -not destroyed |

### Успешной ответ

```
CorrectAnswer=>true;

```

### Ошибки

```
WrongAnswer(code:1002, text: 'error in auth user')
WrongAnswer(code:800, text: 'not found object')
WrongAnswer(code:801, text: 'unknown state')

```

## Метод getObjects

### Адрес

```/?method = getObjects```

### Описание

Возвращает состояние всех не статичных объектов на карте

### Параметры

| Параметры | Тип    | Комментарий              |
|-----------|--------|--------------------------|
| token     | string | Аутентификационный токен |

### Успешный ответ

```
CorrectAnswer => data = {
"objectId": number,
"state": number
}
```

### Ошибки

```
WrongAnswer(code:1002, text: 'error in auth user')

```

## Метод setBullet

### Описание

...

### Адрес

```/?method = setBullet```

### Параметры

| Параметры | Тип    | Комментарий              |
|-----------|--------|--------------------------|
| token     | string | Аутентификационный токен |
| x         | number | Координата пули          |
| y         | number | Координата пули          |
| vx        | number | Координата пули          |
| vy        | number | Координата пули          |

### Успешной ответ

```
CorrectAnswer=>true;

```

### Ошибки

```
WrongAnswer(code:1002, text: 'error in auth user')
WrongAnswer(code:242, text: 'params not set fully')

```

## Метод getBullets

### Описание

Возвращает все пули на сцене

### Адрес

```/?method = getBullets```

### Параметры

| Параметры | Тип    | Комментарий              |
|-----------|--------|--------------------------|
| token     | string | Аутентификационный токен |

### Успешный ответ

```
CorrectAnswer => data = {
bulletId:number
x       :number
y       :number
vx      :number
vy      :number
```

### Ошибки

```
WrongAnswer(code:1002, text: 'error in auth user')
WrongAnswer(code:9000, text: 'Unknown error')
```

## Метод getScene

### Описание

Метод возвращает все данные о сцене(см ниже)

### Адрес

```/?method = getScene```

### Параметры

| Параметры   | Тип    | Комментарий              |
|-------------|--------|--------------------------|
| token       | string | Аутентификационный токен |
| bulletsHash | string | Хэш                      |
| playersHash | string | Хэш                      |
| objectsHash | string | Хэш                      |

### Успешный ответ:

```
CorrectAnswer => data = 
hashs => {
bulletsHash: string,
playersHash: string,
objectsHash: string,
},
scene =>{
players=>{
token:string,
name:string,
teamId: number,
hp:number,
score:number,
status:string,
deaths:string,
x:number,
y:number,
vx:number,
vy:number,
dx:number,
dy:number
},
bullets =>{
bulletId: number,
x:number,
y:number,
vx:number,
vy:number
},
objects =>
{
objectId: number,
state: number ; 1 - destroyed; 0 - not destroyed
}
}
}
```

### Ошибки

## Метод setPlayer

### Описание

Метод возвращает все данные о сцене(см ниже)

### Адрес

```/?method = setPlayer```

### Параметры

| Параметры | Тип    | Комментарий              |
|-----------|--------|--------------------------|
| token     | string | Аутентификационный токен |
| x         | number | Координаты               |
| y         | number | Координаты               |
| vx        | number | Координаты               |
| vy        | number | Координаты               |
| dx        | number | Координаты               |
| dy        | number | Координаты               |

### Успешный ответ:

```
CorrectAnswer => true;
```

### Ошибки

```
WrongAnswer(code:1002, text: 'error in auth user')
```
