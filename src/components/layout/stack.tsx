import { tv, type VariantProps } from 'tailwind-variants';

const stackVariants = tv({
  base: 'flex',
  variants: {
    direction: {
      row: 'flex-row',
      col: 'flex-col',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    direction: 'col',
    gap: 'md',
  },
});

type StackProps = React.ComponentProps<'div'> & VariantProps<typeof stackVariants>;

export function Stack({ direction, gap, align, justify, wrap, className, ...props }: StackProps) {
  return (
    <div
      className={stackVariants({
        direction,
        gap,
        align,
        justify,
        wrap,
        className,
      })}
      {...props}
    />
  );
}
