import { tv, type VariantProps } from 'tailwind-variants';

const sectionVariants = tv({
  base: '',
  variants: {
    padding: {
      none: 'py-0',
      sm: 'py-4',
      md: 'py-8',
      lg: 'py-12',
      xl: 'py-16',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});

type SectionProps = React.ComponentProps<'section'> & VariantProps<typeof sectionVariants>;

export function Section({ padding, className, ...props }: SectionProps) {
  return <section className={sectionVariants({ padding, className })} {...props} />;
}
