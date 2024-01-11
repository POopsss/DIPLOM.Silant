## Запуск

#### Ввод всех команд осуществляется в корневой папке

1. Запуск cервер Django:

* pip install -r requirements.txt
* python manage.py runserver

2. Запуск сервер React:

* npm i
* npm start

## Авторизация

### Форма авторизации на сайте находится в правом верхнем углу.

#### Стандартные пользователи:

| Логин    | Пароль   | Имя пользователя         | Статус    |
|----------|----------|--------------------------|-----------|
| Barsik   | qwe      | Barsik                   | superuser |
| Client1  | oR1vE_7_ | ИП Трудников С.В.        | client    |
| Client2  | YI5wXtd- | ООО "ФПК21"              | client    |
| Client3  | jiBjvH_0 | ООО"МНС77"               | client    |
| Client4  | e9CErUX_ | ООО "Ранский ЛПХ"        | client    |
| Client5  | Rj1vmIW- | ООО "Комплект-Поставка"  | client    |
| Client6  | b6P9z-Nz | ООО "РМК"                | client    |
| Client7  | 7mQ4_8zF | АО "Зандер"              | client    |
| Service1 | zxAcS_j2 | ООО Промышленная техника | service   |
| Service2 | 6PizfI-b | ООО Силант               | service   |
| Service3 | moei-U8q | ООО ФНС                  | service   |
| Manager  | QTipP_6Y | Manager                  | managers  |

#### При создании нового пользователя:
1. Добавьте его в соответствующую группу
2. Укажите его first_name в модели User
3. Сгенерируйте новый токен для пользователя в Tokens

## Примечание

1. Поля и названия таблиц совпадают с их значениями в файле create_db.txt:\
Данный файл отсутствует. Я так понимаю подразумевается, что надо использовать данные из третьей вкладки (Информация для создания модели данных). С некоторыми решениями я не совсем согласен, поэтому допустил некоторые вольности.
2. Группы доступа:\
Под определением "внесение данных" отсутствует конкретика, так что группы пользователей обладающими данными правами имеют доступ к созданию, изменению и удалению объектов соответствующих моделей. Так же им доступен сответствующий интерфейс на сайте.
4. Фильтрация:\
Фильтрация открывается по нажатию на поле "Параметры поиска:".
5. Сортировка для каждой таблицы:\
Производится по нажатию на соответствующий заголовок в таблице. Почти у каждого заголовка есть данная опция. При повторном нажатии, сортировка будет в обратную сторону.
7. Для всех таблиц реализована кликабельность с детальной информацией об объекте модели (описание из справочника):\
Переход на детальную информацию для поля относящемгося к Справочнику производится по клику на него на странице описания объекта (включая отдельных элементов в поле "Комплектация").
8. В проекте присутствует swaggerUI ввиду того, что были переписанны методы create и update, информация в openapi не актуальна. 
