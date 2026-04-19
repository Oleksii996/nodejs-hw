import { model, Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    // валідація на рівні схеми для забезпечення цілісності даних
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // дозволяємо порожній рядок, але не null або undefined
    content: {
      type: String,
      default: '',
      trim: true,
    },
    // використовуємо валідацію для перевірки id
    tag: {
      type: String,
      default: 'Todo',
      enum: TAGS,
    },

    // Нова властивість
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

noteSchema.index({ tag: 1 });
noteSchema.index({ title: 'text', content: 'text' });
export const Note = model('Note', noteSchema);
