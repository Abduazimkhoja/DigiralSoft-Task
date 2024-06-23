'use client';
import { AppDispatch } from '@/store/store';
import { createUser, fetchUsers } from '@/store/user/user.acitons';
import { userSchema } from '@/validation/userValidation';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row } from 'antd';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const initialValues = {
  name: '',
  lastName: '',
  avatar: '',
};

const UserDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    await dispatch(createUser(values));
    dispatch(fetchUsers());
    onClose();
  };

  return (
    <>
      <Button type='primary' onClick={showDrawer} icon={<PlusOutlined />}>
        New user
      </Button>

      <Drawer
        title='Create a new user'
        width={720}
        onClose={onClose}
        open={open}
        styles={{ body: { paddingBottom: 80 } }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <Form onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label='Name'
                    validateStatus={touched.name && errors.name ? 'error' : ''}
                    help={touched.name && errors.name ? errors.name : ''}
                  >
                    <Input
                      name='name'
                      placeholder='Enter name'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Last Name'
                    validateStatus={
                      touched.lastName && errors.lastName ? 'error' : ''
                    }
                    help={
                      touched.lastName && errors.lastName ? errors.lastName : ''
                    }
                  >
                    <Input
                      name='lastName'
                      placeholder='Enter last name'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Avatar'
                    validateStatus={
                      touched.avatar && errors.avatar ? 'error' : ''
                    }
                    help={touched.avatar && errors.avatar ? errors.avatar : ''}
                  >
                    <Input
                      name='avatar'
                      placeholder='Avatar path'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.avatar}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button type='primary' htmlType='submit'>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
};

export default UserDrawer;
