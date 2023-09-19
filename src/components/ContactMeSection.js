import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      type: 'hireMe',
      comment: ''
    },
    onSubmit: (values) => {
      submit(values)
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(),
      email: Yup.string().email('Invalid email address').required('Email is Required'),
      type: Yup.mixed().oneOf(['hireMe', 'openSource', 'other']).optional(),
      comment: Yup.string().min(25).required('Comments are required')
    }),
  });

  useEffect(() => {
    if (response !== null) {
      if (response.type === 'success') {
        onOpen(response.type, `Thanks for your submission, ${formik.values.firstName}. We will get back to you shortly`);

        // Reset the form
        formik.resetForm();
      } else {
        onOpen(response.type, `Something went wrong. Please try again later.`);
      }
    }
  }, [response]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Your Name"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                />
                {
                  formik.touched.firstName && formik.errors.firstName ? (
                    <FormErrorMessage>Name is Required</FormErrorMessage>
                  ) : (<FormErrorMessage></FormErrorMessage>
                  )}
              </FormControl>
              <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email (ex. name@email.com)"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {
                  formik.touched.email && formik.errors.email ? (
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  ) : (<FormErrorMessage></FormErrorMessage>
                  )}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" onChange={formik.handleChange} value={formik.values.type}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  placeholder="Write a message here"
                  onChange={formik.handleChange}
                  value={formik.values.comment}
                />
                {
                  formik.touched.comment && formik.errors.comment ? (
                    <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
                  ) : (<FormErrorMessage></FormErrorMessage>
                  )}
              </FormControl>
              <Button type="submit"
                colorScheme="purple"
                width="full"
                isLoading={isLoading}
                disabled={response}
                loadingText="Submitting">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
