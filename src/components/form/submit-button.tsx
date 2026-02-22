'use client';

import { useFormContext } from '#/hooks/form-context';
import { Button } from '#/components/ui/button';

type SubmitButtonProps = {
  label: string;
  loadingLabel?: string;
};

export function SubmitButton({ label, loadingLabel }: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (loadingLabel !== undefined ? loadingLabel : label) : label}
        </Button>
      )}
    </form.Subscribe>
  );
}
