export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      secondary: 'red',
      neutral: 'zinc'
    },
    modal: {
      slots: {
        content: 'md:!min-w-50 min-h-80 h-max !max-w-200',
        body: 'flex-1 flex flex-col p-4 sm:p-6 '
      }
    },
    table: {
      slots: {
        base: 'bg-white text-default rounded-md',
        th: 'text-ui-text capitalize',
        thead: 'text-grays-900 bg-zinc-50',
        td: 'text-grays-600',
        tr: 'border-b  border-b-zinc-100 hover:bg-zinc-50 transition',
        separator: 'bg-transparent'
      }
    },
    inputDate: {
      base: 'border border-zinc-800 !ring-transparent '
    },
    radioGroup: {
      slots: {
        base: 'ring-zinc-400',
        label: 'block font-medium text-ui-text'
      }
    },
    badge: {
      slots: {
        base: 'font-bold uppercase text-ui-text bg-transparent bg-zinc-200 rounded-md',
        label: 'truncate'
      },
      compoundVariants: [
        {
          color: 'neutral',
          variant: 'solid',
          class: 'text-inverted bg-inverted'
        },
        {
          color: 'neutral',
          variant: 'outline',
          class: 'ring-zinc-300 text-zinc-500 bg-transparent'
        }
      ],
      defaultVariants: {
        color: 'neutral',
        variant: 'outline',
        size: 'sm'
      }
    },
    button: {
      compoundVariants: [
        {
          color: 'neutral',
          variant: 'outline',
          class:
            'text-zinc-600 active:text-zinc-100 bg-transparent ring-zinc-300 active:ring-transparent  transition  hover:bg-transparent focus:outline-none'
        },
        {
          color: 'neutral',
          variant: 'solid',
          class:
            'text-zinc-100 bg-zinc-800 transition hover:text-zinc-500 hover:bg-primary  hover:text-ui-text active:bg-primary/80'
        }
      ],
      defaultVariants: {
        color: 'neutral',
        variant: 'solid',
        size: 'md'
      }
    },
    selectMenu: {
      slots: {
        base: 'ring ring-zinc-800',
        content: '  shadow-md rounded-md'
      },
      variants: {
        variant: {
          outline: {
            base: 'ring-zinc-800  bg-transparent text-zinc-600 transition'
          }
        }
      }
    },
    select: {
      slots: {
        content: 'ring-transparent',
        base: 'ring-transparent bg-transparent'
      },
      variants: {
        variant: {
          outline:
            'text-zinc-600 bg-transparent disabled:bg-transparent ring-transparent border transition hover:bg-transparent  border-zinc-300 hover:border-zinc-400',
          solid: 'text-zinc-600 bg-transparent ring ring-transparent transition'
        }
      },
      defaultVariants: {
        variant: 'solid',
        color: 'neutral',
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
          solid: 'text-zinc-300 bg-transparent ring transition ring-zinc-800'
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
          solid: 'text-zinc-300 bg-transparent ring transition ring-zinc-800'
        }
      },
      defaultVariants: {
        variant: 'solid',
        size: 'md'
      }
    }
  }
})
