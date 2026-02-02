import { tv, type VariantProps } from 'tailwind-variants';

const centerVariants = tv({
  base: 'flex items-center justify-center',
  variants: {
    fullHeight: {
      true: 'min-h-dvh',
      false: '',
    },
  },
  defaultVariants: {
    fullHeight: false,
  },
});

type CenterProps = React.ComponentProps<'div'> & VariantProps<typeof centerVariants>;

export function Center({ fullHeight, className, ...props }: CenterProps) {
  return <div className={centerVariants({ fullHeight, className })} {...props} />;
}
