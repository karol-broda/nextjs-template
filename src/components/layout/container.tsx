import { tv, type VariantProps } from 'tailwind-variants';

const containerVariants = tv({
  base: 'mx-auto w-full px-4',
  variants: {
    maxWidth: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
    },
  },
  defaultVariants: {
    maxWidth: 'xl',
  },
});

type ContainerProps = React.ComponentProps<'div'> & VariantProps<typeof containerVariants>;

export function Container({ maxWidth, className, ...props }: ContainerProps) {
  return <div className={containerVariants({ maxWidth, className })} {...props} />;
}
