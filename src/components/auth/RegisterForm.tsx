// @vsc repo:vsc-project-169-frontend file:src/components/auth/RegisterForm.tsx task:f7-src-components-auth-registerform-tsx module:frontend session:169
import React, { useState } from 'react';
import { z } from 'zod';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { useAuth } from '../../hooks/useAuth';

// Zod schema for registration form
const registerSchema = z
  .object({
    email: z.string().email('ایمیل معتبر وارد کنید'),
    password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
    name: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 2, {
        message: 'نام باید حداقل ۲ کاراکتر باشد',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'رمز عبور و تکرار آن یکسان نیستند',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onError }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData | 'general', string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleChange = (field: keyof RegisterFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear field-specific error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (generalError) setGeneralError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    // Validate with zod
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors: Partial<Record<keyof RegisterFormData | 'general', string>> = {};
      if (fieldErrors.email) newErrors.email = fieldErrors.email[0];
      if (fieldErrors.password) newErrors.password = fieldErrors.password[0];
      if (fieldErrors.name) newErrors.name = fieldErrors.name[0];
      if (fieldErrors.confirmPassword) newErrors.confirmPassword = fieldErrors.confirmPassword[0];
      // Check for refine errors
      result.error.errors.forEach((err) => {
        if (err.path.includes('confirmPassword') && !newErrors.confirmPassword) {
          newErrors.confirmPassword = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name || undefined,
      });
      setIsLoading(false);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setIsLoading(false);
      const message =
        err?.response?.data?.error || err?.message || 'خطا در ثبت‌نام';
      // Show general error either via callback or local state
      if (onError) {
        onError(message);
      } else {
        setGeneralError(message);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6" dir="rtl">
      <form onSubmit={handleSubmit} noValidate>
        {/* General error alert */}
        {generalError && (
          <div className="mb-4 p-3 rounded-md bg-danger-100 text-danger-800 text-sm font-medium">
            {generalError}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <Input
            label="ایمیل"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            hasError={!!errors.email}
            helperText={errors.email}
            placeholder="example@domain.com"
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <Input
            label="رمز عبور"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            hasError={!!errors.password}
            helperText={errors.password}
            placeholder="حداقل ۶ کاراکتر"
            autoComplete="new-password"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <Input
            label="نام (اختیاری)"
            type="text"
            value={formData.name || ''}
            onChange={handleChange('name')}
            hasError={!!errors.name}
            helperText={errors.name}
            placeholder="نام خود را وارد کنید"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <Input
            label="تکرار رمز عبور"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            hasError={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            placeholder="دوباره رمز عبور را وارد کنید"
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full flex items-center justify-center gap-2"
          disabled={isLoading}
          aria-label="ثبت‌نام"
        >
          {isLoading ? (
            <>
              <Spinner size="sm" />
              در حال ثبت‌نام...
            </>
          ) : (
            'ثبت‌نام'
          )}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
