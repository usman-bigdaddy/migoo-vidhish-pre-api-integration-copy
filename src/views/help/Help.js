import React from 'react';
import HeadingTitle from '../../components/headingtitle/HeadingTitle';
import ContactForm from '../../components/contactform/ContactForm';
import FAQ from '../../components/faq/FAQ';
import { useTranslation } from 'react-i18next';

const Help = () => {
  const { t } = useTranslation(); // Or useTranslation('help') if you're using namespaces

  return (
    <>
      <HeadingTitle 
        title={t("help.faq_title")}
        subtitle={t("help.faq_subtitle")}
      />
      <FAQ />

      <HeadingTitle 
        title={t("help.contact_title")}
        subtitle={t("help.contact_subtitle")}
      />
      <ContactForm />
    </>
  );
};

export default Help;
