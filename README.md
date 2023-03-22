# WriteMe

## Онлайн мессенджер

#### Ссылка на проект https://pheroom.github.io/write-me-react


## Используемые технологии:

[Typescript](https://www.typescriptlang.org/),
[React](https://reactjs.org/),
[Redux Toolkit](https://redux-toolkit.js.org/),
[Firebase](https://firebase.google.com/)

## Запустить локально

Клонируйте проект

```bash
  git clone https://github.com/pheroom/write-me-react.git
```

Перейдите в корневую папку

```bash
  cd write-me-react
```

Загрузите зависимости

```bash
  npm install .
```

Создайте файл конфигурации Firebase `src/firebaseConfig.ts`:

```js
export const firebaseConfig = {
    ...
} 
export const storagePath = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/`
```

Запустите локальный сервер

```bash
  npm start
```
``Server available at http://localhost:3000``

