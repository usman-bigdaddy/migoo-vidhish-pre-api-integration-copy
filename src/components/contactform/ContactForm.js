import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import MessageSentModal from '../modals/messagesent/MessageSentModal';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contactForm.nameError');
    if (!formData.subject.trim()) newErrors.subject = t('contactForm.subjectError');
    if (!formData.message.trim()) newErrors.message = t('contactForm.messageError');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', subject: '', message: '' });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', width: '100%' }} noValidate>
      <TextField
        id="name"
        label={t('contactForm.nameLabel')}
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2, mt: 2 }}
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        id="subject"
        label={t('contactForm.subjectLabel')}
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.subject}
        onChange={handleChange}
        error={!!errors.subject}
        helperText={errors.subject}
      />
      <TextField
        id="message"
        label={t('contactForm.messageLabel')}
        multiline
        rows={4}
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.message}
        onChange={handleChange}
        error={!!errors.message}
        helperText={errors.message}
      />

      <Button type="submit" variant="contained" fullWidth>
        {t('contactForm.submitButton')}
      </Button>

      <MessageSentModal open={isModalOpen} onClose={handleCloseModal} />
    </form>
  );
};

export default ContactForm;
