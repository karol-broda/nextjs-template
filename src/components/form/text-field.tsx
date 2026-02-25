'use client';

import { useFieldContext } from '#/hooks/form-context';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';

type TextFieldProps = {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
};

export function TextField({ label, type = 'text', placeholder }: TextFieldProps) {
  const field = useFieldContext<string>();
  const errors = field.state.meta.errors;
  const isTouched = field.state.meta.isTouched;
  const hasError = isTouched && errors.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        placeholder={placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={hasError}
      />
      {hasError && (
        <p className="text-sm text-destructive">{errors.map((err) => err.message).join(', ')}</p>
      )}
    </div>
  );
}
