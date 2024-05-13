import { body } from 'express-validator';
import returnErrors from '../returnErrors';
import BlogRepository from '../../data/repos/BlogRepository';

const postTitleValidator = body('title')
  .isString()
  .withMessage('This field is required')
  .trim()
  .isLength({ max: 30 })
  .withMessage('Invalid length');

const postShortDescriptionValidator = body('shortDescription')
  .isString()
  .withMessage('This field is required')
  .trim()
  .isLength({ max: 100 })
  .withMessage('Invalid length');

const postContentValidator = body('content')
  .isString()
  .withMessage('This field is required')
  .trim()
  .isLength({ max: 1000 })
  .withMessage('Invalid length');

const postBlogIdValidator = body('blogId')
  .isString()
  .withMessage('This field is required')
  .custom(async (id) => {
    if (!BlogRepository.findById(id)) {
      throw Error('Blog not found');
    }
  });

export const postInputValidator = [
  postTitleValidator,
  postShortDescriptionValidator,
  postContentValidator,
  postBlogIdValidator,
  returnErrors,
];
