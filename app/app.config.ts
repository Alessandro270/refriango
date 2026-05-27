export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      secondary: 'red',
      neutral: 'zinc'
    },
    table: {
      slots: {
        base: 'bg-white text-default rounded-md',
        th: 'text-ui-text capitalize',
        thead: 'text-grays-900 bg-zinc-50',
        td: 'text-grays-600',
        tr: 'border-0',
        separator: 'bg-transparent'
      }
    },
    radioGroup: {
      slots: {
        base: 'ring-zinc-400',
        label: 'block font-medium text-ui-text'
      }
    },
    badge: {
      slots: {
        base: 'font-bold uppercase text-ui-text bg-zinc-200 rounded-sm',
        label: 'truncate'
      },
      defaultVariants: {
        color: 'neutral',
        variant: 'soft',
        size: 'sm'
      }
    },
    button: {
      defaultVariants: {
        color: 'neutral',
        variant: 'soft',
        size: 'md'
      }
    },
    select: {
      variants: {
        variant: {
          outline:
            'text-zinc-600 bg-transparent ring transition ring-zinc-300 hover:bg-transparent hover:ring-zinc-400',
          solid: 'text-zinc-600 bg-transparent ring transition ring-zinc-800'
        }
      },
      defaultVariants: {
        variant: 'solid',
        size: 'md'
      }
    },
    textarea: {
      variants: {
        variant: {
          outline: 'text-zinc-600 bg-transparent ring transition ring-zinc-300',
          solid: 'text-zinc-600 bg-transparent ring transition ring-zinc-800'
        }
      },
      defaultVariants: {
        variant: 'solid',
        size: 'md'
      }
    },
    input: {
      variants: {
        variant: {
          outline: 'text-zinc-600 bg-transparent ring transition ring-zinc-300',
          solid: 'text-zinc-600 bg-transparent ring transition ring-zinc-800'
        }
      },
      defaultVariants: {
        variant: 'solid',
        size: 'md'
      }
    },
    inputNumber: {
      variants: {
        variant: {
          outline: 'text-zinc-600 bg-transparent ring transition ring-zinc-300',
          solid: 'text-zinc-600 bg-transparent ring transition ring-zinc-800'
        }
      },
      defaultVariants: {
        variant: 'solid',
        size: 'md'
      }
    }
  }
})
