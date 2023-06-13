import {body} from 'express-validator';
// Валидация регистрации
export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пороль должен быть минимум 8 символов').isLength({min: 8}),
    body('fullName', 'Укажите имя').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

// Валидация авторизации
export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пороль должен быть минимум 8 символов').isLength({min: 8}),

];

// Валидация статей

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 10}).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображения').optional().isURL(),
];