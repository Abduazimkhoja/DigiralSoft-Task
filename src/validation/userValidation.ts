import * as Yup from 'yup';

export const userSchema = Yup.object({
  name: Yup.string().required('Please enter the name'),
  lastName: Yup.string().required('Please enter the last name'),
  avatar: Yup.string()
    .url('Please enter a valid URL')
    .required('Please enter the avatar path'),
});
